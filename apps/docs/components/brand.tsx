import Link from "next/link";

/** The VetClickLab V mark, same geometry as apps/web/components/brand/brand-mark.tsx. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5.5 8 L12 19 L18.5 8" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="6" r="2" fill="currentColor" />
    </svg>
  );
}

export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="VetClickLab Help home">
      <span className="brand-badge">
        <BrandMark className="h-5 w-5 text-white" />
      </span>
      <span className="brand-word">VetClickLab</span>
      <span className="brand-sub">Help</span>
    </Link>
  );
}
