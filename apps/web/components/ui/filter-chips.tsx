"use client";

import { cn } from "@/lib/utils";

export type FilterChipOption<T extends string> = {
  value: T;
  label: string;
  count?: number;
};

/**
 * The one filter control for list pages: a labelled group of toggle chips.
 * Selection is exposed with aria-pressed and shown with the brand tint, so
 * every queue filters the same way.
 */
export function FilterChips<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  options: readonly FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap gap-1.5", className)}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-3.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-9",
              active
                ? "border-primary/40 bg-primary/[0.08] text-primary"
                : "border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            {option.label}
            {option.count !== undefined ? (
              <span className="tabular-nums text-xs opacity-80">{option.count}</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
