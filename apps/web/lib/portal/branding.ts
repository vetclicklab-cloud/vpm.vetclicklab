import { readableAccent } from "@/lib/utils";

export const DEFAULT_PORTAL_BRAND_COLOR = "#0f766e";

/**
 * Return a browser-safe, canonical brand color from tenant-owned JSON settings.
 * Invalid legacy or restored values fall back at the rendering boundary instead
 * of being interpolated into CSS.
 */
export function normalizePortalBrandColor(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return /^#[0-9a-f]{6}$/.test(normalized) ? readableAccent(normalized) : null;
}
