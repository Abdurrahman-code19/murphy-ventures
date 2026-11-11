import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em]",
        tone === "dark" ? "text-gold-ink" : "text-gold-soft",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-px w-7", tone === "dark" ? "bg-gold" : "bg-gold-soft/70")}
      />
      {children}
    </p>
  );
}
