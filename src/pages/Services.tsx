import { ArrowUpRight, CheckCircle2, MapPin, Phone, Store, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
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

const checklist = [
  "The type of equipment and its brand or model",
  "What the machine is doing — or not doing",
  "Whether you prefer a workshop drop-off or a visit",
  "Your location and the best way to reach you",
];

export default function Services() {
  useSeo({
    title: "Technical services & equipment repairs",
    description:
      "Equipment repairs and maintenance in Lagos — note-counting machines, time stamp machines, fireproof safes, banking equipment and office equipment. Workshop drop-off or technician visits.",
    path: "/services",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  });

  return (
    <>
      <PageHero
        eyebrow="Technical services"
        title="Repairs and maintenance for the equipment you depend on."
        description="From note counters and time machines to fireproof safes and office equipment, Murphy Ventures keeps working equipment working."
        highlights={[
          "Note-counting and time machine repairs",
          "Fireproof safe and banking equipment",
          "Office equipment technical support",
        ]}
        actions={
          <>
            <Link to="/request-repair" className={buttonStyles("gold", "md")}>
              <Wrench aria-hidden="true" className="h-4 w-4" />
              Request a repair
            </Link>
            <a href={`tel:${site.phones[0].tel}`} className={buttonStyles("outline-light", "md")}>
              <Phone aria-hidden="true" className="h-4 w-4" />
              {site.phones[0].label}
            </a>
          </>
        }
      />

      <section className="bg-ivory py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="What we repair"
            title="Five service areas."
            description="If your equipment is not listed, contact us with the details — we will confirm whether it is something we can assess."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.slug} delay={Math.min(index * 0.04, 0.16)} className="h-full">
                <article
                  id={service.slug}
                  className="group flex h-full scroll-mt-32 flex-col rounded-[18px] border border-line bg-white p-6 transition-colors hover:border-line-dark sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold-ink">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-deep text-royal">
                      <Wrench aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-[19px] font-semibold leading-snug text-navy">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[13px] leading-relaxed text-muted">
                    {service.detail}
                  </p>
                  <Link
                    to={`/request-repair?equipment=${encodeURIComponent(service.equipmentType)}`}
                    className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-royal transition-colors hover:text-navy"
                  >
                    Request this repair
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.2} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-[18px] border border-navy bg-navy p-6 text-ivory sm:p-7">
                <div>
                  <Eyebrow tone="light">Before you send it</Eyebrow>
                  <h2 className="mt-4 font-display text-[19px] font-semibold leading-snug text-ivory">
                    Tell us what is happening with the machine.
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {checklist.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[12px] leading-snug text-white/65">
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  to="/request-repair"
                  className={buttonStyles("gold", "sm", "mt-6 w-full")}
                >
                  Prepare a repair request
                </Link>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="arrangements" className="relative scroll-mt-28 overflow-hidden bg-navy py-20 text-ivory on-dark sm:py-24">
        <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
        <div
          aria-hidden="true"
          className="absolute -left-32 top-0 h-80 w-80 rounded-full border border-gold/15"
        />
        <Container className="relative">
          <SectionHeading
            tone="light"
            eyebrow="Two arrangements"
            title="Bring it in, or ask us to come to you."
            description="Murphy Ventures offers both workshop drop-off and on-site technician visits. Tell us which suits you and we will confirm the arrangement."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[18px] border border-white/12 bg-white/[0.04] p-6 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                <Store aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-[21px] font-semibold text-ivory">
                Bring it to the workshop
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">
                Drop the equipment at our Abaranje–Ikotun workshop. Contact us first so we can
                confirm the arrangement and what to expect.
              </p>
              <address className="mt-5 flex items-start gap-3 border-t border-white/10 pt-5 text-[12.5px] not-italic leading-relaxed text-white/70">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}
                </span>
              </address>
              <Link
                to="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-soft transition-colors hover:text-ivory"
              >
                Get directions
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </Link>
            </article>

            <article className="rounded-[18px] border border-white/12 bg-white/[0.04] p-6 sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                <MapPin aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-[21px] font-semibold text-ivory">
                Request a technician visit
              </h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/60">
                Share the equipment details, the fault and your location. We will confirm whether
                a visit can be arranged and the details with you directly.
              </p>
              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-[12px] text-white/60">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  Tell us the make, model and fault.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  Include your location and contact number.
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  Wait for the arrangement to be confirmed.
                </li>
              </ul>
              <Link
                to="/request-repair"
                className={buttonStyles("gold", "sm", "mt-6 w-full")}
              >
                Prepare a visit request
              </Link>
            </article>
          </div>

          <p className="mt-6 max-w-2xl text-[11px] leading-relaxed text-white/55">
            Sending a request through this website prepares a WhatsApp message — it does not book
            a repair automatically. The arrangement is confirmed when you speak with our team.
          </p>
        </Container>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-6 rounded-[18px] border border-line bg-ivory p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-display text-[20px] font-semibold text-navy">
                Not sure which service you need?
              </h2>
              <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
                Call the team with the equipment details. We will help you work out whether a
                workshop drop-off or a technician visit makes sense.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
              <a href={`tel:${site.phones[0].tel}`} className={buttonStyles("primary", "md")}>
                <Phone aria-hidden="true" className="h-4 w-4" />
                Call now
              </a>
              <Link to="/faq" className={buttonStyles("outline", "md")}>
                Read the FAQ
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Repair enquiry"
        title="Let’s get the machine working again."
        description="Send the equipment details and the fault. We will confirm the repair arrangement with you."
      />
    </>
  );
}
