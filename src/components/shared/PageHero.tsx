import type { ReactNode } from "react";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { Logo } from "./Logo";
import { cn } from "../../lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  actions?: ReactNode;
  highlights?: string[];
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  actions,
  highlights,
  className,
}: PageHeroProps) {
  return (
    <section className={cn("relative overflow-hidden bg-navy text-ivory on-dark", className)}>
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-70" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-52 h-[520px] w-[520px] rounded-full bg-royal/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-24 h-80 w-80 rounded-full border border-gold/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -left-12 h-60 w-60 rounded-full border border-gold/10"
      />

      <Container className="relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="light" className="mb-6">
              {eyebrow}
            </Eyebrow>
            <h1 className="max-w-3xl font-display text-[clamp(2.3rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ivory">
              {title}
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
              {description}
            </p>
            {actions ? <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div> : null}
          </div>

          {highlights?.length ? (
            <div className="rounded-[18px] border border-white/12 bg-white/[0.04] p-6 backdrop-blur-sm">
              <Logo tone="dark" className="mb-6" />
              <ul className="space-y-3 border-t border-white/10 pt-5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[13px] leading-snug text-white/70"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </Container>
      <div aria-hidden="true" className="h-px w-full bg-gold/30" />
    </section>
  );
}
