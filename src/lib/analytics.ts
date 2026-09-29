/**
 * Privacy-first analytics event dispatcher.
 * STRICT PRIVACY RULE: Never forward personal identifiable information (names, emails, phones, company names)
 * or legal questionnaire answers (loss range, role, bank response) to external telemetry.
 */

export type AnalyticsEvent =
  | { name: "cta_click"; properties: { position: "header" | "hero" | "audience" | "floating" } }
  | { name: "form_start" }
  | { name: "form_submit_attempt" }
  | { name: "form_submit_success" }
  | { name: "form_submit_error"; properties: { category: "validation" | "network" | "server" | "rate_limit" } }
  | { name: "video_play" };

export function trackEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // In development, log the event structure to console for debugging
  if (process.env.NODE_ENV !== "production") {
    console.debug("[Telemetry Event]", event.name, "properties" in event ? event.properties : {});
  }

  // Window dataLayer or custom dispatcher support without leaking PII
  const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
  if (Array.isArray(win.dataLayer)) {
    win.dataLayer.push({
      event: event.name,
      ...("properties" in event ? event.properties : {}),
      timestamp: Date.now(),
    });
  }
}
