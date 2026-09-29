import test from "node:test";
import assert from "node:assert/strict";
import { leadFormSchema } from "../src/lib/lead-schema";
import {
  deliverLeadToDestination,
  checkIdempotency,
  checkRateLimit,
} from "../src/lib/lead-delivery";

test("Lead Form Validation - Valid Payload", () => {
  const validData = {
    fullName: "Carlos Eduardo Silva",
    companyName: "Silva Transportes Ltda",
    phone: "(11) 98765-4321",
    email: "carlos@silvatransportes.com.br",
    companyRole: "Sócio(a) / proprietário(a)",
    lossRange: "De R$ 30 mil a menos de R$ 100 mil",
    bankContacted: "Sim, aguarda resposta",
  };

  const result = leadFormSchema.safeParse(validData);
  assert.equal(result.success, true);
});

test("Lead Form Validation - Under R$ 10k is valid and does NOT auto-reject", () => {
  // PRD Rule: A resposta abaixo de R$ 10 mil não dispara negativa jurídica automática.
  const belowThresholdData = {
    fullName: "Ana Paula Ramos",
    companyName: "Ramos Café Comércio",
    phone: "(31) 99123-4567",
    email: "",
    companyRole: "Sócio(a) / proprietário(a)",
    lossRange: "Menos de R$ 10 mil",
    bankContacted: "Ainda não",
  };

  const result = leadFormSchema.safeParse(belowThresholdData);
  assert.equal(result.success, true);
});

test("Lead Form Validation - Invalid Payload (missing fields)", () => {
  const invalidData = {
    fullName: "A", // too short
    companyName: "",
    phone: "123",
  };

  const result = leadFormSchema.safeParse(invalidData);
  assert.equal(result.success, false);
  if (!result.success) {
    const fields = result.error.issues.map((i) => i.path[0]);
    assert.ok(fields.includes("fullName"));
    assert.ok(fields.includes("companyName"));
    assert.ok(fields.includes("phone"));
    assert.ok(fields.includes("companyRole"));
    assert.ok(fields.includes("lossRange"));
    assert.ok(fields.includes("bankContacted"));
  }
});

test("Lead Form Validation - Honeypot Trap Rejection", () => {
  const spamData = {
    fullName: "Spam Bot",
    companyName: "Bot Corp",
    phone: "(11) 98765-4321",
    companyRole: "Outro",
    lossRange: "Menos de R$ 10 mil",
    bankContacted: "Ainda não",
    website_trap: "http://spam-link.com",
  };

  const result = leadFormSchema.safeParse(spamData);
  assert.equal(result.success, false);
});

test("Lead Delivery - Dev Mock Mode Returns 201 and stores idempotency", async () => {
  (process.env as Record<string, string | undefined>).NODE_ENV = "development";
  delete process.env.LEAD_WEBHOOK_URL;

  const idempotencyKey = `test-key-${Date.now()}`;
  const payload = {
    fullName: "Mariana Souza",
    companyName: "Souza Comércio e Distribuição",
    phone: "(21) 99887-6655",
    companyRole: "Gestor(a) / responsável financeiro" as const,
    lossRange: "R$ 100 mil ou mais" as const,
    bankContacted: "Sim, recebeu negativa ou resposta insatisfatória" as const,
  };

  const res1 = await deliverLeadToDestination(payload, idempotencyKey);
  assert.equal(res1.success, true);
  assert.equal(res1.status, 201);
  assert.ok(res1.leadId);

  // Check idempotency store immediately
  const cached = checkIdempotency(idempotencyKey);
  assert.ok(cached);
  assert.equal(cached.idempotent, true);
});

test("Lead Delivery - Production without configured webhook returns 503", async () => {
  (process.env as Record<string, string | undefined>).NODE_ENV = "production";
  delete process.env.LEAD_WEBHOOK_URL;

  const payload = {
    fullName: "Teste Producao",
    companyName: "Empresa Producao",
    phone: "(11) 98765-4321",
    companyRole: "Representante autorizado" as const,
    lossRange: "De R$ 10 mil a menos de R$ 30 mil" as const,
    bankContacted: "Sim, aguarda resposta" as const,
  };

  const res = await deliverLeadToDestination(payload, "prod-key-no-webhook");
  assert.equal(res.success, false);
  assert.equal(res.status, 503);
  assert.ok(res.error);
});

test("Rate Limit Checker", () => {
  const testIp = `10.0.0.${Math.floor(Math.random() * 200 + 1)}`;
  for (let i = 0; i < 10; i++) {
    const allowed = checkRateLimit(testIp);
    assert.equal(allowed, true);
  }
  // 11th request should be rate-limited
  const rejected = checkRateLimit(testIp);
  assert.equal(rejected, false);
});
