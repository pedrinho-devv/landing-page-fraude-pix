import { createHmac, timingSafeEqual } from "node:crypto";

export const RECEIPT_COOKIE = "lead_receipt";
const MAX_AGE = 3600;
function sign(value: string) {
  const secret = process.env.LEAD_RECEIPT_SECRET;
  if (!secret) throw new Error("LEAD_RECEIPT_SECRET must be configured");
  return createHmac("sha256", secret).update(value).digest("base64url");
}
export function createReceipt(leadId: string) {
  const payload = Buffer.from(JSON.stringify({ leadId, expires: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
export function readReceipt(value?: string): { leadId: string } | null {
  if (!value) return null;
  try {
    const [payload, signature] = value.split(".");
    const expected = Buffer.from(sign(payload));
    const received = Buffer.from(signature || "");
    if (expected.length !== received.length || !timingSafeEqual(expected, received)) return null;
    const receipt = JSON.parse(Buffer.from(payload, "base64url").toString());
    return typeof receipt.leadId === "string" && receipt.expires > Date.now() ? { leadId: receipt.leadId } : null;
  } catch { return null; }
}
export const receiptOptions = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: MAX_AGE };
