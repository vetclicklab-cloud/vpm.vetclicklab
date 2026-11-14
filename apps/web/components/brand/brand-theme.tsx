"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@/lib/trpc";
import { hexToHslString, readableAccent } from "@/lib/utils";

/**
 * Applies the practice's accent color to --primary at runtime, so the color a
 * clinic picks shows up on buttons and links. The VetClickLab brand (--brand)
 * and the focus ring stay fixed. Too-light accents are darkened to stay
 * readable. Renders nothing.
 */
export function BrandTheme() {
  const { status } = useSession();
  const { data } = trpc.settings.getBranding.useQuery(undefined, {
    enabled: status === "authenticated",
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const root = document.documentElement;
    const hsl = data?.brandColor
      ? hexToHslString(readableAccent(data.brandColor))
      : null;
    if (hsl) root.style.setProperty("--primary", hsl);
    else root.style.removeProperty("--primary");
  }, [data?.brandColor]);

  return null;
}
