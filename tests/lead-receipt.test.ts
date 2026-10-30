import test from "node:test";
import assert from "node:assert/strict";
import { createReceipt, readReceipt } from "../src/lib/lead-receipt";

test("Confirmation requires a valid signed receipt", () => {
  process.env.LEAD_RECEIPT_SECRET = "test-only-secret";
  const receipt = createReceipt("confirmed-123");
  assert.deepEqual(readReceipt(receipt), { leadId: "confirmed-123" });
  assert.equal(readReceipt(), null);
  assert.equal(readReceipt(receipt + "tampered"), null);
  process.env.LEAD_RECEIPT_SECRET = "different-secret";
  assert.equal(readReceipt(receipt), null);
});

test("Expired receipts cannot open confirmation", () => {
  process.env.LEAD_RECEIPT_SECRET = "test-only-secret";
  const now = Date.now;
  try {
    Date.now = () => now() - 3601000;
    const receipt = createReceipt("expired");
    Date.now = now;
    assert.equal(readReceipt(receipt), null);
  } finally { Date.now = now; }
});
