"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

// Shared across component remounts when browser storage is unavailable.
const fired = new Set<string>();
export function ThankYouTracker({ leadId }: { leadId: string }) {
  useEffect(() => {
    const key = `lead-conversion:${leadId}`;
    if (fired.has(key)) return;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      // Fail closed: avoid counting a lead repeatedly when storage is blocked.
      return;
    }
    fired.add(key);
    trackEvent({ name: "thank_you_page_view" });
    trackEvent({ name: "Lead", properties: { event_id: leadId } });
  }, [leadId]);
  return null;
}
