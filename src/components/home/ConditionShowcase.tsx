import { ArrowUpRight, Recycle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../shared/Container";
import { Eyebrow } from "../shared/Eyebrow";
import { Reveal } from "../shared/Reveal";

const options = [
  {
    value: "new",
    label: "New equipment",
    description:
      "Brand-new banking and office machines for teams that want the latest unit with a full working life ahead of it.",
    icon: Sparkles,
    index: "01",
  },
  {
    value: "fairly-used",
    label: "Fairly used",
    description:
      "Pre-owned machines for a more economical route to the equipment you need. Condition and model are confirmed per item.",
    icon: Recycle,
    index: "02",
  },
];

export function ConditionShowcase() {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-ivory on-dark sm:py-24">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full border border-gold/15"
      />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <Eyebrow tone="light" className="mb-5">
              New &amp; fairly used
            </Eyebrow>
            <h2 className="max-w-md font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-ivory">
              The right machine.
              <br />
              The right condition.
            </h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-white/60">
              Murphy Ventures supplies both new and fairly used equipment, so you can weigh
              budget against working life. We confirm the exact condition of each machine before
              you commit.
            </p>
            <p className="mt-6 flex items-start gap-2.5 text-[11.5px] leading-relaxed text-white/60">
              <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
              Not every model is available in both conditions. Tell us what you need and we will
              confirm the options.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {options.map((option, index) => {
              const Icon = option.icon;
              return (
                <Reveal key={option.value} delay={index * 0.08} className="h-full">
                  <Link
                    to={`/products?condition=${option.value}`}
                    className="group flex h-full flex-col justify-between rounded-[18px] border border-white/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-float sm:p-7"
                  >
                    <div className="flex items-start justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                        <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                        {option.index}
                      </span>
                    </div>
                    <div className="mt-10">
                      <h3 className="font-display text-[19px] font-semibold text-navy">
                        {option.label}
                      </h3>
                      <p className="mt-2.5 text-[12.5px] leading-relaxed text-muted">
                        {option.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-royal">
                        View options
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
