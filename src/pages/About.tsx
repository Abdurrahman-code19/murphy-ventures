import { ArrowUpRight, Eye, Gauge, Quote, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../config/site";
import { useSeo } from "../hooks/useSeo";
import { breadcrumbSchema } from "../lib/schema";
import { buttonStyles } from "../components/shared/Button";
import { Container } from "../components/shared/Container";
import { CtaBand } from "../components/shared/CtaBand";
import { Eyebrow } from "../components/shared/Eyebrow";
import { PageHero } from "../components/shared/PageHero";
import { Reveal } from "../components/shared/Reveal";
import { SectionHeading } from "../components/shared/SectionHeading";

const pillars = [
  {
    icon: Target,
    label: "Mission",
    text: "To supply high-quality banking and office equipment that improves efficiency, security and productivity.",
  },
  {
    icon: Eye,
    label: "Vision",
    text: "To be the preferred provider of banking and office equipment solutions, recognised for quality, innovation, reliability and outstanding customer service.",
  },
  {
    icon: Gauge,
    label: "Objective",
    text: "To offer innovative technology solutions that improve business efficiency and productivity.",
  },
];

const values = [
  {
    title: "Quality",
    text: "We focus on equipment that can stand up to daily use in banks, offices and businesses.",
  },
  {
    title: "Reliability",
    text: "Dependable machines and dependable support — the two have to come together.",
  },
  {
    title: "Service",
    text: "Straight answers, practical repair options and after-sales support when you need it.",
  },
  {
    title: "Innovation",
    text: "We help businesses adopt the equipment that makes their work faster and more secure.",
  },
];

const audiences = [
  "Individuals",
  "Banks",
  "Offices",
  "Businesses",
  "Corporate organisations",
];

export default function About() {
  useSeo({
    title: "About Murphy Ventures",
    description:
      "Learn about Murphy Ventures Technical Services — a Lagos-based supplier of banking and office equipment, with repair and maintenance support for businesses and institutions.",
    path: "/about",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ]),
  });

  return (
    <>
      <PageHero
        eyebrow="About Murphy Ventures"
        title={
          <>
            Equipment, expertise and service that hold up.
          </>
        }
        description="Murphy Ventures is a Lagos-based supplier of banking and office equipment — and the technical team behind it when a machine needs attention."
        highlights={[
          "New and fairly used equipment",
          "Workshop and on-site repairs",
          "Supporting individuals, banks and offices",
        ]}
        actions={
          <>
            <Link to="/products" className={buttonStyles("gold", "md")}>
              Explore equipment
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link to="/contact" className={buttonStyles("outline-light", "md")}>
              Contact our team
            </Link>
          </>
        }
      />

      <section className="bg-ivory py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow className="mb-5">The company</Eyebrow>
              <h2 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-navy">
                Banking equipment,
                <br />
                office equipment and
                <br />
                technical services.
              </h2>
              <div className="mt-6 space-y-4 text-[14.5px] leading-relaxed text-muted">
                <p>
                  Murphy Ventures sells and repairs the equipment that keeps cash, documents and
                  daily operations moving. Our range covers banknote counting machines, time
                  recording and time stamp machines, fireproof safes, counterfeit money detectors,
                  printing calculators and other confirmed office equipment.
                </p>
                <p>
                  We work with both new and fairly used machines, so customers can choose the
                  condition that fits their budget and working life. Every item is confirmed
                  individually — model, condition, price and availability.
                </p>
                <p>
                  When equipment needs attention, our technical service covers repairs and
                  maintenance. Customers can bring faulty equipment to our Abaranje–Ikotun
                  workshop, or request a technician visit to their location.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {audiences.map((audience) => (
                  <span
                    key={audience}
                    className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[11.5px] font-medium text-ink"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[18px] border border-line bg-white p-6 sm:p-7">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                  What we supply
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Banknote counting machines",
                    "Time recording & time stamp machines",
                    "Fireproof safes",
                    "Counterfeit & UV money detectors",
                    "Printing calculators & cheque writers",
                    "Other confirmed office equipment",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 border-b border-line pb-3 text-[12.5px] leading-snug text-ink last:border-0 last:pb-0"
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

              <div className="rounded-[18px] border border-navy bg-navy p-6 text-ivory sm:p-7">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  Our commitment
                </p>
                <p className="mt-3 font-display text-[16px] font-medium leading-snug">
                  Timely delivery and dependable after-sales support.
                </p>
                <Link
                  to="/services"
                  className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-soft transition-colors hover:text-ivory"
                >
                  Technical services
                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What guides us"
            title="Mission, vision and objective."
            description="The principles behind how Murphy Ventures works with customers and the equipment they depend on."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.label} delay={index * 0.06} className="h-full">
                  <article className="flex h-full flex-col rounded-[18px] border border-line bg-ivory p-6 sm:p-7">
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gold-ink shadow-sm">
                        <Icon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] text-muted/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 font-display text-[18px] font-semibold text-navy">
                      {pillar.label}
                    </h3>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-muted">{pillar.text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-navy py-16 text-ivory on-dark sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-80 w-80 rounded-full border border-gold/20"
        />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <Quote aria-hidden="true" className="mx-auto h-7 w-7 text-gold" />
            <p className="mt-6 font-display text-[clamp(1.5rem,3.4vw,2.4rem)] font-medium leading-snug tracking-[-0.025em] text-ivory">
              “{site.motto}”
            </p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
              The Murphy Ventures motto
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Business values"
            title="What we care about."
            description="Four principles that shape the equipment we supply and the support we provide."
          />
          <div className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={Math.min(index * 0.05, 0.15)}>
                <div className="border-t border-line py-6">
                  <p className="text-[9.5px] font-semibold tracking-[0.2em] text-gold-ink">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-[17px] font-semibold text-navy">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Work with us"
        title="Quality you can trust. Service you can rely on."
        description="Whether you are equipping an office or getting a machine back to work, tell us what you need and we will confirm the next step."
      />
    </>
  );
}
