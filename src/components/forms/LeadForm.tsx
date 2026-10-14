"use client";

import React, { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  leadFormSchema,
  LeadFormData,
  companyRoleOptions,
  lossRangeOptions,
  bankContactedOptions,
} from "@/lib/lead-schema";
import { trackEvent } from "@/lib/analytics";
import { landingContent } from "@/content/landing";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function LeadForm() {
  const router = useRouter();
  const { form: formContent } = landingContent;
  const formSessionId = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      companyName: "",
      phone: "",
      email: "",
      companyRole: undefined,
      lossRange: undefined,
      bankContacted: undefined,
      website_trap: "",
    },
  });

  const handleFieldFocus = () => {
    if (!hasTrackedStart) {
      setHasTrackedStart(true);
      trackEvent({ name: "form_start" });
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setErrorMessage("");
    trackEvent({ name: "form_submit_attempt" });

    const key = `lead-${formSessionId.replace(/:/g, "")}`;
    const generatedWhatsappUrl = getWhatsAppUrl(data);

    // Salva os dados na sessionStorage para a página de obrigado carregar a mensagem personalizada
    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("lead_whatsapp_url", generatedWhatsappUrl);
        sessionStorage.setItem("lead_name", data.fullName.trim());
      } catch (e) {
        console.warn("sessionStorage warning:", e);
      }
    }

    try {
      // Registrar lead em background para não perder os dados
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-idempotency-key": key,
        },
        body: JSON.stringify({
          ...data,
          idempotencyKey: key,
        }),
      });
    } catch (err) {
      console.warn("Registro do lead na API encontrou instabilidade, prosseguindo com fluxo:", err);
    }

    trackEvent({ name: "form_submit_success" });
    // Navega para a página de obrigado com o parâmetro de redirecionamento para o WhatsApp
    router.push("/obrigado?auto_redirect=1");
  };

  if (submitStatus === "success") {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="p-8 sm:p-10 rounded-2xl bg-white text-[#000044] border-2 border-[#FABD04] shadow-xl text-center"
      >
        <div className="w-14 h-14 mx-auto rounded-full bg-[#FABD04]/20 text-[#000044] flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-[#000044]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="fluid-h3 text-[#000044] mb-3">
          Solicitação enviada com sucesso!
        </h3>
        <p className="reading-body text-base text-[#000044]/90 mb-6">
          Redirecionando para as orientações e atendimento no WhatsApp...
        </p>
        <div className="flex justify-center">
          <div className="w-7 h-7 border-3 border-[#000044]/20 border-t-[#000044] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 rounded-2xl bg-white text-[#000044] shadow-2xl border border-[#000044]/10">
      {/* Live Error Alert */}
      {submitStatus === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-900 text-sm flex items-start gap-3"
        >
          <span className="font-bold text-base leading-none text-red-700">!</span>
          <p>{errorMessage || formContent.errorMessage}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-6"
      >
        {/* Anti-spam honeypot */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website_trap">Não preencha este campo</label>
          <input
            id="website_trap"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("website_trap")}
          />
        </div>

        {/* 1. Nome completo */}
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-[#000044] mb-1.5"
          >
            {formContent.fields.fullName.label}{" "}
            <span className="text-[#000044]/60" aria-hidden="true">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder={formContent.fields.fullName.placeholder}
            aria-required="true"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            onFocus={handleFieldFocus}
            {...register("fullName")}
            className={`w-full min-h-[48px] px-3.5 py-3 rounded-lg border text-base sm:text-sm text-[#000044] bg-[#FEFEFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#000044] ${
              errors.fullName
                ? "border-red-600 bg-red-50/20"
                : "border-[#000044]/25 hover:border-[#000044]/50"
            }`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* 2. Nome da empresa */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-semibold text-[#000044] mb-1.5"
          >
            {formContent.fields.companyName.label}{" "}
            <span className="text-[#000044]/60" aria-hidden="true">*</span>
          </label>
          <input
            id="companyName"
            type="text"
            autoComplete="organization"
            placeholder={formContent.fields.companyName.placeholder}
            aria-required="true"
            aria-invalid={Boolean(errors.companyName)}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
            onFocus={handleFieldFocus}
            {...register("companyName")}
            className={`w-full min-h-[48px] px-3.5 py-3 rounded-lg border text-base sm:text-sm text-[#000044] bg-[#FEFEFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#000044] ${
              errors.companyName
                ? "border-red-600 bg-red-50/20"
                : "border-[#000044]/25 hover:border-[#000044]/50"
            }`}
          />
          {errors.companyName && (
            <p id="companyName-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.companyName.message}
            </p>
          )}
        </div>

        {/* 3. Telefone / WhatsApp */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-[#000044] mb-1.5"
          >
            {formContent.fields.phone.label}{" "}
            <span className="text-[#000044]/60" aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={formContent.fields.phone.placeholder}
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            onFocus={handleFieldFocus}
            {...register("phone")}
            className={`w-full min-h-[48px] px-3.5 py-3 rounded-lg border text-base sm:text-sm text-[#000044] bg-[#FEFEFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#000044] ${
              errors.phone
                ? "border-red-600 bg-red-50/20"
                : "border-[#000044]/25 hover:border-[#000044]/50"
            }`}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* 4. E-mail (opcional) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[#000044] mb-1.5"
          >
            {formContent.fields.email.label}
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={formContent.fields.email.placeholder}
            aria-required="false"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onFocus={handleFieldFocus}
            {...register("email")}
            className={`w-full min-h-[48px] px-3.5 py-3 rounded-lg border text-base sm:text-sm text-[#000044] bg-[#FEFEFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#000044] ${
              errors.email
                ? "border-red-600 bg-red-50/20"
                : "border-[#000044]/25 hover:border-[#000044]/50"
            }`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="pt-2 border-t border-[#000044]/10 space-y-6">
          {/* Question 1: Vínculo */}
          <div>
            <label
              htmlFor="companyRole"
              className="block text-sm font-semibold text-[#000044] mb-1.5"
            >
              1. {formContent.fields.companyRole.label}{" "}
              <span className="text-[#000044]/60" aria-hidden="true">*</span>
            </label>
            <select
              id="companyRole"
              defaultValue=""
              aria-required="true"
              aria-invalid={Boolean(errors.companyRole)}
              aria-describedby={errors.companyRole ? "companyRole-error" : undefined}
              onFocus={handleFieldFocus}
              {...register("companyRole")}
              className={`w-full min-h-[48px] px-3.5 py-3 rounded-lg border text-base sm:text-sm text-[#000044] bg-[#FEFEFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#000044] ${
                errors.companyRole
                  ? "border-red-600 bg-red-50/20"
                  : "border-[#000044]/25 hover:border-[#000044]/50"
              }`}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {companyRoleOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.companyRole && (
              <p id="companyRole-error" className="mt-1.5 text-xs text-red-600 font-medium">
                {errors.companyRole.message}
              </p>
            )}
          </div>

          {/* Question 2: Faixa aproximada do prejuízo */}
          <div>
            <label
              htmlFor="lossRange"
              className="block text-sm font-semibold text-[#000044] mb-1.5"
            >
              2. {formContent.fields.lossRange.label}{" "}
              <span className="text-[#000044]/60" aria-hidden="true">*</span>
            </label>
            <select
              id="lossRange"
              defaultValue=""
              aria-required="true"
              aria-invalid={Boolean(errors.lossRange)}
              aria-describedby={errors.lossRange ? "lossRange-error" : undefined}
              onFocus={handleFieldFocus}
              {...register("lossRange")}
              className={`w-full min-h-[48px] px-3.5 py-3 rounded-lg border text-base sm:text-sm text-[#000044] bg-[#FEFEFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#000044] ${
                errors.lossRange
                  ? "border-red-600 bg-red-50/20"
                  : "border-[#000044]/25 hover:border-[#000044]/50"
              }`}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {lossRangeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.lossRange && (
              <p id="lossRange-error" className="mt-1.5 text-xs text-red-600 font-medium">
                {errors.lossRange.message}
              </p>
            )}
          </div>

          {/* Question 3: Comunicação ao banco */}
          <div>
            <label
              htmlFor="bankContacted"
              className="block text-sm font-semibold text-[#000044] mb-1.5"
            >
              3. {formContent.fields.bankContacted.label}{" "}
              <span className="text-[#000044]/60" aria-hidden="true">*</span>
            </label>
            <select
              id="bankContacted"
              defaultValue=""
              aria-required="true"
              aria-invalid={Boolean(errors.bankContacted)}
              aria-describedby={errors.bankContacted ? "bankContacted-error" : undefined}
              onFocus={handleFieldFocus}
              {...register("bankContacted")}
              className={`w-full min-h-[48px] px-3.5 py-3 rounded-lg border text-base sm:text-sm text-[#000044] bg-[#FEFEFE] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#000044] ${
                errors.bankContacted
                  ? "border-red-600 bg-red-50/20"
                  : "border-[#000044]/25 hover:border-[#000044]/50"
              }`}
            >
              <option value="" disabled>
                Selecione uma opção
              </option>
              {bankContactedOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            {errors.bankContacted && (
              <p id="bankContacted-error" className="mt-1.5 text-xs text-red-600 font-medium">
                {errors.bankContacted.message}
              </p>
            )}
          </div>
        </div>

        {/* Privacy Note */}
        <p className="text-xs text-[#000044]/75 leading-relaxed pt-2">
          {formContent.privacyNotice}
        </p>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full min-h-[52px] px-6 py-3.5 rounded-lg font-bold text-base text-[#000044] bg-[#FABD04] transition-all duration-200 hover:brightness-105 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#000044] shadow-md flex items-center justify-center gap-2 cursor-pointer ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : "hover:-translate-y-0.5"
          }`}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-[#000044]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              <span>{formContent.submittingButton}</span>
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5 text-[#000044] shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>{formContent.submitButton}</span>
            </>
          )}
        </button>

        <p className="text-center text-xs text-[#000044]/70 pt-1">
          {formContent.whatsappRedirectNote}
        </p>
      </form>
    </div>
  );
}
