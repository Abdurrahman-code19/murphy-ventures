import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
  action,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <Eyebrow tone={tone} className={cn("mb-5", align === "center" && "justify-center")}>
            {eyebrow}
          </Eyebrow>
        ) : null}
        <h2
          className={cn(
            "font-display text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.035em]",
            tone === "light" ? "text-ivory" : "text-navy",
            titleClassName,
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base",
              tone === "light" ? "text-white/65" : "text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
