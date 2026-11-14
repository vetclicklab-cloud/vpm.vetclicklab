import { describe, expect, it } from "vitest";
import {
  DEFAULT_PORTAL_BRAND_COLOR,
  normalizePortalBrandColor,
} from "./branding";

describe("portal branding", () => {
  it("canonicalizes valid six-digit hex colors", () => {
    expect(normalizePortalBrandColor(" #1A2B3C ")).toBe("#1a2b3c");
  });

  it("darkens accents too light for white text", () => {
    expect(normalizePortalBrandColor("#a1b2c3")).not.toBe("#a1b2c3");
  });

  it.each([
    undefined,
    null,
    123,
    "",
    "#abc",
    "red",
    "#123456; background: url(javascript:alert(1))",
  ])("rejects an unsafe or unsupported value: %s", (value) => {
    expect(normalizePortalBrandColor(value)).toBeNull();
  });

  it("keeps the VetClickLab teal as the stable fallback", () => {
    expect(DEFAULT_PORTAL_BRAND_COLOR).toBe("#0f766e");
  });
});
