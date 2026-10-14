"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function ThankYouTracker() {
  useEffect(() => {
    trackEvent({ name: "thank_you_page_view" });
  }, []);

  return null;
}
