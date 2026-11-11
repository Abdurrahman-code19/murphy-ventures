import { cn } from "../../lib/utils";

/**
 * Murphy Ventures emblem plus a clean typographic lockup.
 * The supplied emblem is used unmodified and its aspect ratio is preserved.
 */
export function Logo({
  tone = "light",
  className,
}: {
  /** Surface the logo sits on: `light` for ivory/white, `dark` for navy. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5 sm:gap-3", className)}>
      <img
        src="/images/branding/emblem.webp"
        alt=""
        width={854}
        height={670}
        className="h-9 w-auto shrink-0 object-contain sm:h-12"
        decoding="async"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[11.5px] font-extrabold tracking-[0.1em] sm:text-[15px] sm:tracking-[0.14em]",
            tone === "dark" ? "text-ivory" : "text-navy",
          )}
        >
          MURPHY{" "}
          <span className={tone === "dark" ? "text-gold-soft" : "text-gold-ink"}>VENTURES</span>
        </span>
        <span
          className={cn(
            "mt-1 text-[7px] font-semibold uppercase tracking-[0.22em] sm:mt-1.5 sm:text-[8.5px] sm:tracking-[0.3em]",
            tone === "dark" ? "text-white/55" : "text-muted",
          )}
        >
          Technical Services
        </span>
      </span>
    </span>
  );
}
