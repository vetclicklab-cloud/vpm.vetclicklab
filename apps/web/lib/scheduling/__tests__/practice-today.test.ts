import { describe, expect, it } from "vitest";
import { practiceToday, toISODate } from "../calendar-views";

describe("practiceToday", () => {
  it("uses the practice time zone's calendar day, not the device's", () => {
    // 2026-11-14 00:30 UTC is still Nov 13 in New York but Nov 14 in Kolkata.
    const now = new Date("2026-11-14T00:30:00Z");
    expect(toISODate(practiceToday("America/New_York", now))).toBe("2026-11-13");
    expect(toISODate(practiceToday("Asia/Kolkata", now))).toBe("2026-11-14");
  });
});
