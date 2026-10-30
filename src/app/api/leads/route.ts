import { NextRequest, NextResponse } from "next/server";
import { createReceipt, RECEIPT_COOKIE, receiptOptions } from "@/lib/lead-receipt";
import { leadFormSchema } from "@/lib/lead-schema";
import {
  checkRateLimit,
  checkIdempotency,
  deliverLeadToDestination,
} from "@/lib/lead-delivery";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Client IP for rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: "Limite de tentativas excedido. Por favor, aguarde alguns minutos.",
        },
        { status: 429 }
      );
    }

    // 2. Payload size & JSON parsing
    const rawBody = await request.text();
    if (rawBody.length > 50000) {
      // 50KB limit
      return NextResponse.json(
        { success: false, error: "Requisição excede o tamanho permitido." },
        { status: 400 }
      );
    }

    let parsedBody: Record<string, unknown>;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { success: false, error: "Formato de dados inválido." },
        { status: 400 }
      );
    }

    // 3. Honeypot verification
    if (parsedBody.website_trap && typeof parsedBody.website_trap === "string" && parsedBody.website_trap.length > 0) {
      return NextResponse.json(
        { success: false, error: "Submissão rejeitada." },
        { status: 400 }
      );
    }

    // 4. Schema validation with Zod
    const validationResult = leadFormSchema.safeParse(parsedBody);
    if (!validationResult.success) {
      const issues = validationResult.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return NextResponse.json(
        {
          success: false,
          error: "Por favor, revise as informações fornecidas.",
          issues,
        },
        { status: 400 }
      );
    }

    const leadData = validationResult.data;

    // 5. Idempotency handling
    const headerIdempotency = request.headers.get("x-idempotency-key");
    const payloadIdempotency = typeof parsedBody.idempotencyKey === "string" ? parsedBody.idempotencyKey : undefined;
    const idempotencyKey = headerIdempotency || payloadIdempotency;

    if (idempotencyKey) {
      const cached = checkIdempotency(idempotencyKey);
      if (cached) {
        const response = NextResponse.json(cached, { status: 200 });
        if (cached.leadId) response.cookies.set(RECEIPT_COOKIE, createReceipt(cached.leadId), receiptOptions);
        return response;
      }
    }

    if (!process.env.LEAD_RECEIPT_SECRET) {
      return NextResponse.json({ success: false, error: "O atendimento está temporariamente indisponível. Tente novamente mais tarde." }, { status: 503 });
    }

    // 6. Deliver to destination (CRM / Webhook / Dev mock)
    const delivery = await deliverLeadToDestination(leadData, idempotencyKey);

    if (!delivery.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            delivery.error ||
            "Não foi possível registrar sua solicitação no momento. Tente novamente.",
        },
        { status: delivery.status || 503 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        leadId: delivery.leadId,
        message:
          "Solicitação recebida. A equipe poderá entrar em contato pelo canal informado para orientar os próximos passos. O envio não constitui contratação nem garante a viabilidade do caso.",
      },
      { status: 201 }
    );
    response.cookies.set(RECEIPT_COOKIE, createReceipt(delivery.leadId!), receiptOptions);
    return response;
  } catch (error: unknown) {
    console.error("[API Leads Error] Unexpected error processing lead:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Erro interno no servidor ao processar a solicitação.",
      },
      { status: 500 }
    );
  }
}
