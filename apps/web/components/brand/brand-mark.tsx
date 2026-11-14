/**
 * The VetClickLab brand mark: a bold "V" with a click point. Single source for
 * the in-app logo so every surface (sidebar, auth, e-sign / capture headers)
 * renders the same shape. Geometry matches `public/logo.svg`,
 * `public/favicon.svg` and the PDF mark in `lib/pdf.ts`. No "use client" so it
 * works in server components too.
 *
 * `BrandMark` draws just the mark in `currentColor`; `BrandBadge` is the full
 * lockup (white mark on the fixed brand teal, rounded square).
 */

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5.5 8 L12 19 L18.5 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

/** White mark on the fixed brand teal, rounded square. `className` sets the square. */
export function BrandBadge({
  className,
  markClassName = "h-4 w-4",
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <div
      className={
        "flex items-center justify-center rounded-lg bg-brand text-brand-foreground " +
        (className ?? "h-8 w-8")
      }
    >
      <BrandMark className={markClassName} />
    </div>
  );
}
