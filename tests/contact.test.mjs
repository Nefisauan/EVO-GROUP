import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "../lib/contact-validation.mjs";
const valid = () => ({
  name: "Jane Doe",
  email: "jane@example.com",
  company: "Example",
  interest: "Automation",
  challenge: "We would like to simplify our internal approval workflows.",
  consent: "yes",
  startedAt: Date.now() - 10000,
});
test("accepts and trims a legitimate inquiry", () => {
  const input = valid();
  input.name = " Jane Doe ";
  assert.equal(validateInquiry(input).data.name, "Jane Doe");
});
test("rejects spam, missing consent, invalid email, unsafe URLs, oversized fields and malformed payloads", () => {
  for (const bad of [
    null,
    [],
    { ...valid(), fax: "spam" },
    { ...valid(), consent: "" },
    { ...valid(), email: "invalid" },
    { ...valid(), website: "javascript:alert(1)" },
    { ...valid(), challenge: "x".repeat(5001) },
    { ...valid(), startedAt: Date.now() },
    { ...valid(), company: "" },
  ])
    assert.ok(validateInquiry(bad).error);
});
