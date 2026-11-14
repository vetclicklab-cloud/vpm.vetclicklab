import { describe, expect, it } from "vitest";
import { contrastOnWhite, readableAccent } from "../utils";

describe("readableAccent", () => {
  it("keeps readable colors unchanged", () => {
    expect(readableAccent("#0f766e")).toBe("#0f766e");
  });
  it("darkens light accents until they reach 4.5:1 on white", () => {
    for (const c of ["#f97316", "#16a34a", "#db2777", "#ffff00", "#ffffff", "#0d9488"]) {
      expect(contrastOnWhite(readableAccent(c))).toBeGreaterThanOrEqual(4.5);
    }
  });
  it("leaves invalid input alone", () => {
    expect(readableAccent("teal")).toBe("teal");
  });
});
