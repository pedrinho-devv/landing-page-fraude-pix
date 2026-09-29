import { LeadSubmissionPayload, LeadSubmissionResponse } from "./lead-schema";

// Simple in-memory storage for idempotency in serverless/Node environment
interface ProcessedLeadRecord {
  id: string;
  timestamp: number;
  response: LeadSubmissionResponse;
}

const idempotencyStore = new Map<string, ProcessedLeadRecord>();
const ipRateLimitStore = new Map<string, { count: number; firstSeen: number }>();

// Cleanup older entries every 15 minutes
const IDEMPOTENCY_TTL_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 10;

function cleanupOldRecords() {
  const now = Date.now();
  for (const [key, record] of idempotencyStore.entries()) {
    if (now - record.timestamp > IDEMPOTENCY_TTL_MS) {
      idempotencyStore.delete(key);
    }
  }
  for (const [ip, entry] of ipRateLimitStore.entries()) {
    if (now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
      ipRateLimitStore.delete(ip);
    }
  }
}

/**
 * Masks sensitive personal data for privacy-compliant logging
 */
export function maskSensitiveData(payload: LeadSubmissionPayload) {
  const maskText = (text?: string) => {
    if (!text) return "";
    if (text.length <= 3) return "***";
    return text.charAt(0) + "***" + text.charAt(text.length - 1);
  };

  const maskPhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 6) return "***";
    return `${digits.slice(0, 2)}****${digits.slice(-2)}`;
  };

  return {
    maskedName: maskText(payload.fullName),
    maskedCompany: maskText(payload.companyName),
    maskedPhone: maskPhone(payload.phone),
    hasEmail: Boolean(payload.email && payload.email.trim().length > 0),
    companyRole: payload.companyRole,
    lossRange: payload.lossRange,
    bankContacted: payload.bankContacted,
  };
}

export function checkRateLimit(clientIp: string): boolean {
  cleanupOldRecords();
  const now = Date.now();
  const entry = ipRateLimitStore.get(clientIp);

  if (!entry) {
    ipRateLimitStore.set(clientIp, { count: 1, firstSeen: now });
    return true;
  }

  if (now - entry.firstSeen > RATE_LIMIT_WINDOW_MS) {
    ipRateLimitStore.set(clientIp, { count: 1, firstSeen: now });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function checkIdempotency(key?: string): LeadSubmissionResponse | null {
  if (!key) return null;
  cleanupOldRecords();
  const existing = idempotencyStore.get(key);
  if (existing) {
    return {
      ...existing.response,
      idempotent: true,
    };
  }
  return null;
}

export async function deliverLeadToDestination(
  payload: LeadSubmissionPayload,
  idempotencyKey?: string
): Promise<{ success: boolean; leadId?: string; error?: string; status: number }> {
  const isProduction = process.env.NODE_ENV === "production";
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  // Log masked event without full PII
  const masked = maskSensitiveData(payload);
  console.info("[Lead Delivery] Processing lead submission:", {
    role: masked.companyRole,
    lossRange: masked.lossRange,
    bankContacted: masked.bankContacted,
    idempotencyKey: idempotencyKey ? `${idempotencyKey.slice(0, 8)}...` : undefined,
  });

  // Production requirement: Must have a configured destination
  if (!webhookUrl) {
    if (isProduction) {
      console.error(
        "[Lead Delivery Error] LEAD_WEBHOOK_URL is not configured in production environment."
      );
      return {
        success: false,
        status: 503,
        error: "Serviço de atendimento temporariamente indisponível para novos registros.",
      };
    }

    // Development mock
    const mockId = `mock-lead-${Date.now()}`;
    console.info(`[Lead Delivery Dev Mock] Lead received successfully in dev mode (${mockId})`);

    const result: LeadSubmissionResponse = {
      success: true,
      leadId: mockId,
      message:
        "Solicitação recebida. A equipe poderá entrar em contato pelo canal informado para orientar os próximos passos. O envio não constitui contratação nem garante a viabilidade do caso.",
    };

    if (idempotencyKey) {
      idempotencyStore.set(idempotencyKey, {
        id: mockId,
        timestamp: Date.now(),
        response: result,
      });
    }

    return {
      success: true,
      status: 201,
      leadId: mockId,
    };
  }

  // Live external delivery (CRM, Webhook or Notification service)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Lead-Source": "landing-page-fraudepix",
        ...(idempotencyKey ? { "X-Idempotency-Key": idempotencyKey } : {}),
      },
      body: JSON.stringify({
        ...payload,
        submittedAt: new Date().toISOString(),
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`[Lead Delivery Error] Webhook responded with status ${res.status}`);
      return {
        success: false,
        status: 502,
        error: "Falha na comunicação com o canal de atendimento.",
      };
    }

    const leadId = `lead-${Date.now()}`;
    const result: LeadSubmissionResponse = {
      success: true,
      leadId,
      message:
        "Solicitação recebida. A equipe poderá entrar em contato pelo canal informado para orientar os próximos passos. O envio não constitui contratação nem garante a viabilidade do caso.",
    };

    if (idempotencyKey) {
      idempotencyStore.set(idempotencyKey, {
        id: leadId,
        timestamp: Date.now(),
        response: result,
      });
    }

    return {
      success: true,
      status: 201,
      leadId,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[Lead Delivery Error] Failed to deliver lead:", errorMsg);
    return {
      success: false,
      status: 503,
      error: "O serviço de recepção está temporariamente inacessível.",
    };
  }
}
