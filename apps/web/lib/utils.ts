import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Loose email-shape check for client-side form validation. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Up-to-two-letter initials from a name, for avatars / brand marks. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** Convert a #RRGGBB hex to the "H S% L%" string our CSS color vars expect. */
export function hexToHslString(hex: string): string | null {
  const m = /^#?([0-9a-fA-F]{6})$/.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1]!, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/** WCAG contrast ratio of a #RRGGBB color against white. */
export function contrastOnWhite(hex: string): number {
  const int = parseInt(hex.replace("#", ""), 16);
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  const L =
    0.2126 * lin((int >> 16) & 255) +
    0.7152 * lin((int >> 8) & 255) +
    0.0722 * lin(int & 255);
  return 1.05 / (L + 0.05);
}

/**
 * A clinic accent is used as button fill (white text) and as link text, so it
 * must clear 4.5:1 against white. Targets 5:1 to leave headroom for tinted
 * backgrounds (active nav, the canvas). Darkens by scaling RGB channels;
 * already-readable colors pass through.
 */
export function readableAccent(hex: string): string {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return hex;
  const int = parseInt(hex.slice(1), 16);
  const rgb = [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  let out = hex.toLowerCase();
  for (let f = 1; contrastOnWhite(out) < 5 && f > 0; f -= 0.02) {
    out = "#" + rgb.map((c) => Math.round(c * f).toString(16).padStart(2, "0")).join("");
  }
  return out;
}
