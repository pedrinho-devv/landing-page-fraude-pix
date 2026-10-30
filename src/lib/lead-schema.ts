import { z } from "zod";

export const companyRoleOptions = [
  "Sócio(a) / proprietário(a)",
  "Gestor(a) / responsável financeiro",
  "Representante autorizado",
  "Outro",
] as const;

export const lossRangeOptions = [
  "Menos de R$ 10 mil",
  "De R$ 10 mil a menos de R$ 30 mil",
  "De R$ 30 mil a menos de R$ 100 mil",
  "R$ 100 mil ou mais",
  "Ainda não sei",
] as const;

export const bankContactedOptions = [
  "Sim, aguarda resposta",
  "Sim, recebeu negativa ou resposta insatisfatória",
  "Sim, houve devolução parcial",
  "Ainda não",
] as const;

export const leadFormSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Por favor, informe seu nome completo (mínimo 3 caracteres).")
    .max(120, "O nome não pode ultrapassar 120 caracteres."),
  companyName: z
    .string()
    .trim()
    .min(2, "Por favor, informe o nome da empresa.")
    .max(140, "O nome da empresa não pode ultrapassar 140 caracteres."),
  phone: z
    .string()
    .trim()
    .min(10, "Informe um número de telefone ou WhatsApp válido com DDD.")
    .max(25, "Número de telefone inválido.")
    .regex(/^[0-9+()\s.-]+$/, "Formato de telefone inválido.")
    .refine(value => { const digits = value.replace(/\D/g, ""); return /^(?:55)?[1-9][0-9][0-9]{8,9}$/.test(digits); }, "Informe um número válido com DDD."),
  email: z
    .string()
    .trim()
    .max(120, "E-mail muito longo.")
    .refine((val) => val === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Por favor, informe um endereço de e-mail válido.",
    })
    .optional(),
  companyRole: z.enum(companyRoleOptions, {
    message: "Selecione o seu vínculo com a empresa.",
  }),
  lossRange: z.enum(lossRangeOptions, {
    message: "Selecione a faixa aproximada do prejuízo.",
  }),
  bankContacted: z.enum(bankContactedOptions, {
    message: "Informe se já houve comunicação ao banco.",
  }),
  // Honeypot for spam bot mitigation
  website_trap: z.string().max(0, "Submissão rejeitada.").optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export interface LeadSubmissionPayload extends LeadFormData {
  idempotencyKey?: string;
  submittedAt?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  leadId?: string;
  idempotent?: boolean;
}
