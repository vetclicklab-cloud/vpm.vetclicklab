import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VetClickLab",
    short_name: "VetClickLab",
    description: "Veterinary practice management for clinic teams.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f8fa",
    theme_color: "#0f766e",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
