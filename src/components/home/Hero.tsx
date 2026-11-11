import { ArrowUpRight, Check, Phone, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { productImageSrcSet } from "../../lib/products";
import { formatNaira } from "../../lib/utils";
import { buttonStyles } from "../shared/Button";
import { Container } from "../shared/Container";
import { Eyebrow } from "../shared/Eyebrow";
import { Reveal } from "../shared/Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ivory">
      <div
        aria-hidden="true"
        className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full border border-gold/20"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 top-28 h-[380px] w-[380px] rounded-full border border-gold/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-blueprint-light opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />

      <Container className="relative pb-20 pt-12 sm:pt-16 lg:pb-28 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
          <div>
            <Reveal>
              <Eyebrow className="mb-6">Banking &amp; office equipment · Lagos</Eyebrow>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="max-w-[640px] font-display text-[clamp(2.55rem,6.2vw,4.35rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-navy">
                Reliable <br />
                Equipment.{" "}
                <span className="mt-2 block text-royal">
                  Expert Technical <br />
                  Solutions.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-lg text-[15px] leading-relaxed text-muted sm:text-base">
                Your trusted partner for banking and office equipment, professional repairs
                and dependable technical support.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                <Link to="/products" className={buttonStyles("primary", "lg", "group")}>
                  Explore Products
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  to="/request-repair"
                  className={buttonStyles("outline", "lg", "border-line-dark bg-white/60")}
                >
                  <Wrench aria-hidden="true" className="h-4 w-4" />
                  Request Technical Support
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-8 flex flex-col gap-2.5 text-[12.5px] text-ink/80 sm:flex-row sm:flex-wrap sm:gap-x-6">
                {["New & fairly used equipment", "Workshop & on-site repairs"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gold/15 text-gold-ink">
                      <Check aria-hidden="true" className="h-2.5 w-2.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted">
                <span aria-hidden="true" className="h-px w-6 bg-line-dark" />
                Typical equipment range {formatNaira(site.priceRange.min)} –{" "}
                {formatNaira(site.priceRange.max)}. Individual prices on request.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="relative">
            <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
              <div
                aria-hidden="true"
                className="absolute -left-4 -top-4 h-24 w-24 border-l border-t border-gold/50"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-4 -right-4 h-24 w-24 border-b border-r border-gold/50"
              />

              <div className="relative overflow-hidden rounded-[22px] border border-line bg-white shadow-card">
                <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-gold" aria-hidden="true" />
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-navy">
                      Equipment showcase
                    </p>
                  </div>
                  <span className="text-[9px] uppercase tracking-[0.18em] text-muted">
                    Lagos, NG
                  </span>
                </div>

                <div className="relative bg-white">
                  <img
                    src="/images/products/money-counting-machines/banknote-counting-machines.webp"
                    srcSet={productImageSrcSet(
                      "/images/products/money-counting-machines/banknote-counting-machines.webp",
                    )}
                    sizes="(min-width: 1024px) 540px, 92vw"
                    alt="Banknote counting machine, the kind supplied by Murphy Ventures"
                    width={1200}
                    height={900}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted">
                      Cash management
                    </p>
                    <p className="mt-1 font-display text-[14px] font-semibold text-navy">
                      Banknote counting machines
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-line px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-gold-ink">
                    Price on request
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-6 left-2 w-[230px] rounded-[14px] bg-navy p-4 text-ivory shadow-float sm:-left-6 sm:w-[252px]">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-gold-soft">
                    <Wrench aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <p className="font-display text-[12.5px] font-semibold leading-tight">
                    Repairs &amp; maintenance
                  </p>
                </div>
                <p className="mt-2.5 text-[10.5px] leading-relaxed text-white/55">
                  Workshop drop-off or a technician visit, arranged with our team.
                </p>
              </div>

              <a
                href={`tel:${site.phones[0].tel}`}
                className="absolute -right-2 top-[46%] hidden items-center gap-2 rounded-[12px] border border-line bg-white/95 px-3.5 py-2.5 shadow-card backdrop-blur transition-colors hover:border-gold sm:flex"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                  <Phone aria-hidden="true" className="h-3 w-3" />
                </span>
                <span className="text-[10.5px] font-semibold text-navy">Call our team</span>
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
