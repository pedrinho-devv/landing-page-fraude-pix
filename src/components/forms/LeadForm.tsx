"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, type LeadFormData, companyRoleOptions, lossRangeOptions, bankContactedOptions } from "@/lib/lead-schema";
import { sendToWeb3Forms, CONFIRMATION_KEY } from "@/lib/web3forms";
import { trackEvent } from "@/lib/analytics";
import { landingContent } from "@/content/landing";

export function LeadForm() {
  const router = useRouter();
  const { form } = landingContent;
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const key = useRef("");
  const started = useRef(false);
  const busy = useRef(false);
  const { register, handleSubmit, trigger, setFocus, formState: { errors, isSubmitting } } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema), mode: "onBlur",
    defaultValues: { fullName: "", phone: "", companyName: "", email: "", website_trap: "" },
  });

  async function next() {
    if (await trigger(["fullName", "phone"], { shouldFocus: true })) {
      setStep(2);
      requestAnimationFrame(() => setFocus("companyName"));
    }
  }

  async function submit(data: LeadFormData) {
    if (busy.current) return;
    busy.current = true;
    setError("");
    trackEvent({ name: "form_submit_attempt" });
    key.current ||= crypto.randomUUID();
    try {
      // Verify storage before sending so the confirmation can be shown afterwards.
      sessionStorage.setItem("lead-storage-check", "1");
      sessionStorage.removeItem("lead-storage-check");
      await sendToWeb3Forms(data);
      sessionStorage.setItem(CONFIRMATION_KEY, JSON.stringify({ leadId: key.current, expires: Date.now() + 3600000 }));
      trackEvent({ name: "form_submit_success" });
      router.push("/obrigado");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : form.errorMessage);
      trackEvent({ name: "form_submit_error", properties: { category: "server" } });
    } finally {
      busy.current = false;
    }
  }

  const inputClass = "w-full min-h-12 rounded-lg border border-[#000044]/30 bg-white px-3 py-3 text-base text-[#000044] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000044]";
  function field(name: "fullName" | "phone" | "companyName" | "email", type = "text") {
    const content = form.fields[name];
    return <div key={name}>
      <label htmlFor={name} className="block text-sm font-semibold mb-2">{content.label}</label>
      <input {...register(name)} id={name} type={type} autoComplete={{fullName: "name", phone: "tel", companyName: "organization", email: "email"}[name]} placeholder={content.placeholder} aria-required={name !== "email"} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined} className={inputClass} />
      {errors[name] && <p id={`${name}-error`} className="text-sm text-red-700 mt-1" role="alert">{errors[name]?.message}</p>}
    </div>;
  }
  function select(name: "companyRole" | "lossRange" | "bankContacted", options: readonly string[]) {
    return <div key={name}>
      <label htmlFor={name} className="block text-sm font-semibold mb-2">{form.fields[name].label}</label>
      <select {...register(name)} id={name} defaultValue="" className={inputClass} aria-required="true" aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-error` : undefined}>
        <option value="" disabled>Selecione uma opção</option>
        {options.map(option => <option key={option}>{option}</option>)}
      </select>
      {errors[name] && <p id={`${name}-error`} className="text-sm text-red-700 mt-1" role="alert">{errors[name]?.message}</p>}
    </div>;
  }
  return <div className="rounded-2xl bg-white p-5 sm:p-7 text-[#000044] border border-[#000044]/10 [color-scheme:light]">
    <p className="text-xs font-semibold uppercase tracking-wider mb-2" aria-live="polite">Etapa {step} de 2 · {step === 1 ? "Seu contato" : "Para avaliar seu caso"}</p>
    <h2 className="text-2xl font-bold mb-2">{step === 1 ? "Conte com uma avaliação do seu caso." : "Agora, conte um pouco sobre a empresa."}</h2>
    <p className="text-sm text-[#000044]/75 mb-5">{step === 1 ? "Comece com seu nome e WhatsApp. Na próxima etapa, informe os detalhes da ocorrência." : "Estas informações ajudam a equipe a orientar os próximos passos."}</p>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error} Seus dados continuam preenchidos.</p>}
    <form noValidate className="space-y-4" onFocus={() => { if (!started.current) { started.current = true; trackEvent({name: "form_start"}); } }} onSubmit={event => { if (step === 1) { event.preventDefault(); void next(); } else { void handleSubmit(submit)(event); } }}>
      <div className="sr-only" aria-hidden="true"><label htmlFor="website_trap">Não preencha este campo</label><input {...register("website_trap")} id="website_trap" tabIndex={-1} autoComplete="off" /></div>
      <fieldset hidden={step !== 1} className="space-y-4"><legend className="sr-only">Seu contato</legend>{field("fullName")}{field("phone", "tel")}</fieldset>
      <fieldset hidden={step !== 2} className="space-y-4"><legend className="sr-only">Para avaliar seu caso</legend>{field("companyName")}{field("email", "email")}{select("companyRole", companyRoleOptions)}{select("lossRange", lossRangeOptions)}{select("bankContacted", bankContactedOptions)}</fieldset>
      <p className="text-xs leading-relaxed text-[#000044]/75">Usaremos seus dados para responder à solicitação. Leia a <a href="/privacidade" className="underline">Política de Privacidade</a>.</p>
      <button type="submit" disabled={isSubmitting} className="w-full min-h-13 rounded-lg bg-[#FABD04] px-4 py-3 font-bold cursor-pointer disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000044]">{step === 1 ? "Continuar para os detalhes" : isSubmitting ? form.submittingButton : form.submitButton}</button>
      {step === 2 && <button type="button" disabled={isSubmitting} onClick={() => { setStep(1); requestAnimationFrame(() => setFocus("fullName")); }} className="min-h-11 underline text-sm cursor-pointer">Voltar aos dados de contato</button>}
      <p className="text-xs text-[#000044]/70">{step === 1 ? "Atendimento a empresas com prejuízo a partir de R$ 10 mil." : form.whatsappRedirectNote}</p>
      <p className="text-xs text-[#000044]/60">A análise não implica garantia de ressarcimento ou contratação automática.</p>
    </form>
  </div>;
}
