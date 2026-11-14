/**
 * Brand identity passed into every email shell. Defaults resolve VetClickLab's
 * hosted identity from env (so app + emails stay in sync), with sane fallbacks
 * for local rendering / previews.
 */
export interface Brand {
  /** Display name in the header wordmark. */
  name: string;
  /** Legal/company name shown in the footer. */
  companyName: string;
  /** Reply-To + footer contact address. */
  supportEmail: string;
  /** Physical mailing address (CAN-SPAM for promotional nudges). Optional. */
  companyAddress?: string;
  /** Base URL of the hosted app (CTAs). */
  appUrl: string;
  /** Marketing site URL. */
  marketingUrl: string;
  /**
   * Optional hosted logo image (PNG recommended — most email clients strip
   * SVG). When omitted, the shell renders a CSS wordmark that works everywhere.
   */
  logoUrl?: string;
}

function nonBlankEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function openvpmBrand(): Brand {
  return {
    name: "VetClickLab",
    companyName: nonBlankEnv("EMAIL_COMPANY_NAME") ?? "VetClickLab",
    supportEmail: nonBlankEnv("EMAIL_SUPPORT_ADDRESS") ?? "support@vetclicklab.com",
    companyAddress: nonBlankEnv("EMAIL_COMPANY_ADDRESS"),
    appUrl: nonBlankEnv("NEXT_PUBLIC_APP_URL") ?? "https://app.vetclicklab.com",
    marketingUrl: "https://vetclicklab.com",
    logoUrl: nonBlankEnv("EMAIL_LOGO_URL"),
  };
}
