import { test } from "@playwright/test";
import path from "path";

// Render the shared V mark as high-res PNGs for GitHub avatar / social
// preview. Output into docs/brand/ so it's discoverable but separate from
// the README screenshots directory.

const MARK_HTML = `<!doctype html>
<html><head><meta charset="utf-8"/>
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  body { display: flex; align-items: center; justify-content: center; }
</style>
</head>
<body>
  <svg width="1024" height="1024" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="8" fill="#0f766e"/>
    <g transform="translate(8 8)">
      <path d="M5.5 8 L12 19 L18.5 8" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="6" r="2" fill="#ffffff"/>
    </g>
  </svg>
</body></html>`;

// Social preview card (GitHub recommends 1280×640, neutral background).
const SOCIAL_HTML = `<!doctype html>
<html><head><meta charset="utf-8"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 1280px; height: 640px; }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: #f8fafc;
    color: #0f172a;
    padding: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 36px;
  }
  .mark { width: 160px; height: 160px; border-radius: 32px; background: #0f766e; display: flex; align-items: center; justify-content: center; }
  h1 { font-weight: 700; font-size: 72px; letter-spacing: -1.5px; line-height: 1.05; max-width: 1000px; }
  p { font-size: 28px; color: #475569; max-width: 900px; line-height: 1.4; }
  .url { font-size: 20px; color: #0f766e; font-weight: 600; margin-top: 12px; }
</style>
</head>
<body>
  <div class="mark">
    <svg width="96" height="96" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 8 L12 19 L18.5 8" fill="none" stroke="#ffffff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="12" cy="6" r="2" fill="#ffffff"/>
    </svg>
  </div>
  <h1>VetClickLab</h1>
  <p>Practice management for veterinary clinics: schedule, records, billing and follow-up in one place.</p>
  <span class="url">app.vetclicklab.com</span>
</body></html>`;

test("generate mark + github social preview", async ({ page }) => {
  const outDir = path.resolve(__dirname, "../docs/brand");
  const fs = await import("fs");
  fs.mkdirSync(outDir, { recursive: true });

  // 1024×1024 mark only (use as GitHub avatar or profile image)
  await page.setViewportSize({ width: 1024, height: 1024 });
  await page.setContent(MARK_HTML, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(outDir, "mark-1024.png"),
    type: "png",
    clip: { x: 0, y: 0, width: 1024, height: 1024 },
    omitBackground: true,
  });

  // 1280×640 social preview card (upload via GitHub → Settings → Social preview)
  await page.setViewportSize({ width: 1280, height: 640 });
  await page.setContent(SOCIAL_HTML, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(outDir, "github-social-preview.png"),
    type: "png",
    clip: { x: 0, y: 0, width: 1280, height: 640 },
  });
});
