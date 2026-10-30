"use client";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ThankYouTracker } from "@/components/analytics/ThankYouTracker";
import { CONFIRMATION_KEY } from "@/lib/web3forms";

// Browser flow guard only: Web3Forms free submissions have no server-verifiable receipt.
export function Web3FormsConfirmation({ children }: { children: ReactNode }) {
  const [leadId, setLeadId] = useState("");
  const router = useRouter();
  useEffect(() => {
    try {
      const receipt = JSON.parse(sessionStorage.getItem(CONFIRMATION_KEY) || "null");
      if (receipt && typeof receipt.leadId === "string" && receipt.expires > Date.now()) {
        setLeadId(receipt.leadId);
        return;
      }
    } catch { /* Missing/blocked storage returns to the form. */ }
    router.replace("/#analise");
  }, [router]);
  if (!leadId) return <p role="status" className="p-8 text-center">Verificando confirmação…</p>;
  return <><ThankYouTracker leadId={leadId} />{children}</>;
}
