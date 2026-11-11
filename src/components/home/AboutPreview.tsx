import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { Container } from "../shared/Container";
import { Eyebrow } from "../shared/Eyebrow";
import { Reveal } from "../shared/Reveal";

export function AboutPreview() {
  return (
    <section className="border-t border-line bg-ivory py-20 sm:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[20px] border border-line bg-white p-6 shadow-card sm:p-9">
              <div aria-hidden="true" className="absolute inset-0 bg-blueprint-light opacity-60" />
              <div
                aria-hidden="true"
                className="absolute left-4 top-4 h-12 w-12 border-l border-t border-gold/40"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-4 right-4 h-12 w-12 border-b border-r border-gold/40"
              />
              <img
                src="/images/branding/logo-full.webp"
                alt="Murphy Ventures Technical Services logo"
                width={760}
                height={760}
                loading="lazy"
                className="relative mx-auto w-full max-w-[330px]"
              />
              <p className="relative mt-5 text-center text-[9px] font-semibold uppercase tracking-[0.22em] text-muted">
                Banking &amp; office equipment · Lagos, Nigeria
              </p>
            </div>
            <div className="absolute -bottom-5 right-4 max-w-[240px] rounded-[12px] bg-navy px-4 py-3.5 shadow-float sm:right-8">
              <p className="text-[8.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
                Our motto
              </p>
              <p className="mt-1.5 font-display text-[11.5px] font-medium leading-snug text-ivory">
                {site.motto}
              </p>
            </div>
          </Reveal>

          <div>
            <Eyebrow className="mb-5">About the company</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-navy">
              A technical partner
              <br />
              for the equipment
              <br />
              your business depends on.
            </h2>
            <p className="mt-6 max-w-xl text-[14.5px] leading-relaxed text-muted">
              Murphy Ventures supplies and repairs banking and office equipment for individuals,
              banks, offices and corporate organisations. From note counters and time machines to
              fireproof safes and office equipment, we help teams work with equipment they can
              trust.
            </p>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-muted">
              Our work is guided by a simple commitment: quality equipment, practical technical
              support and dependable after-sales service.
            </p>

            <dl className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
                  Mission
                </dt>
                <dd className="mt-2 text-[12.5px] leading-relaxed text-ink">
                  To supply high-quality banking and office equipment that improves efficiency,
                  security and productivity.
                </dd>
              </div>
              <div>
                <dt className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-gold-ink">
                  Vision
                </dt>
                <dd className="mt-2 text-[12.5px] leading-relaxed text-ink">
                  To be the preferred provider of banking and office equipment solutions,
                  recognised for quality, reliability and outstanding service.
                </dd>
              </div>
            </dl>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-royal transition-colors hover:text-navy"
            >
              More about Murphy Ventures
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
