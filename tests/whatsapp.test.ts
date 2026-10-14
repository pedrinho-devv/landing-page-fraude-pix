import test from "node:test";
import assert from "node:assert/strict";
import { formatWhatsAppLeadMessage, getWhatsAppUrl, WHATSAPP_CONFIG } from "../src/lib/whatsapp";
import { LeadFormData } from "../src/lib/lead-schema";

test("formatWhatsAppLeadMessage - formats message with all fields", () => {
  const data: LeadFormData = {
    fullName: "Carlos Eduardo Silva",
    companyName: "Silva & Filhos Comércio",
    phone: "(86) 98123-4567",
    email: "carlos@silva.com.br",
    companyRole: "Sócio(a) / proprietário(a)",
    lossRange: "De R$ 30 mil a menos de R$ 100 mil",
    bankContacted: "Sim, aguarda resposta",
  };

  const message = formatWhatsAppLeadMessage(data);

  assert.ok(message.includes("⚖️ *SOLICITAÇÃO DE ANÁLISE — FRAUDE VIA PIX*"));
  assert.ok(message.includes("Carlos Eduardo Silva"));
  assert.ok(message.includes("Silva & Filhos Comércio"));
  assert.ok(message.includes("(86) 98123-4567"));
  assert.ok(message.includes("carlos@silva.com.br"));
  assert.ok(message.includes("Sócio(a) / proprietário(a)"));
  assert.ok(message.includes("De R$ 30 mil a menos de R$ 100 mil"));
  assert.ok(message.includes("Sim, aguarda resposta"));
});

test("formatWhatsAppLeadMessage - handles optional email when not provided", () => {
  const data: LeadFormData = {
    fullName: "Ana Maria",
    companyName: "Ana Modas",
    phone: "(86) 99999-0000",
    companyRole: "Gestor(a) / responsável financeiro",
    lossRange: "R$ 100 mil ou mais",
    bankContacted: "Sim, recebeu negativa ou resposta insatisfatória",
  };

  const message = formatWhatsAppLeadMessage(data);

  assert.ok(!message.includes("E-mail:"));
  assert.ok(message.includes("Ana Maria"));
  assert.ok(message.includes("Ana Modas"));
});

test("getWhatsAppUrl - generates valid wa.me link with phone 5586981572651", () => {
  const data: LeadFormData = {
    fullName: "Test Lead",
    companyName: "Empresa Teste",
    phone: "86988887777",
    companyRole: "Representante autorizado",
    lossRange: "De R$ 10 mil a menos de R$ 30 mil",
    bankContacted: "Ainda não",
  };

  const url = getWhatsAppUrl(data);

  assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_CONFIG.rawNumber}?text=`));
  assert.ok(url.includes("5586981572651"));
  assert.ok(url.includes(encodeURIComponent("Test Lead")));
  assert.ok(url.includes(encodeURIComponent("Empresa Teste")));
});
