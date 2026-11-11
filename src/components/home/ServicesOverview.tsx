import { ArrowUpRight, MapPin, Store, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { services } from "../../data/services";
import { buttonStyles } from "../shared/Button";
import { Container } from "../shared/Container";
import { Eyebrow } from "../shared/Eyebrow";
import { Reveal } from "../shared/Reveal";

export function ServicesOverview() {
  return (
    <section className="border-t border-line bg-ivory py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
          <div>
            <Eyebrow className="mb-5">Technical services</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-navy">
              When equipment stops,
              <br />
              the work shouldn&apos;t.
            </h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-muted">
              Murphy Ventures repairs and maintains the banking and office equipment that
              businesses rely on every day. Two arrangements, one point of contact.
            </p>

            <div className="mt-8 rounded-[16px] border border-line bg-white p-5">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                Two ways to get support
              </p>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-royal">
                    <Store aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-navy">Bring it to us</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-muted">
                      Drop the equipment at our Abaranje–Ikotun workshop.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-royal">
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-navy">
                      Request a technician visit
                    </p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-muted">
                      Tell us the fault and your location to arrange a visit.
                    </p>
                  </div>
                </li>
              </ul>
              <Link
                to="/request-repair"
                className={buttonStyles("primary", "sm", "mt-5 w-full")}
              >
                <Wrench aria-hidden="true" className="h-3.5 w-3.5" />
                Request a repair
              </Link>
            </div>
          </div>

          <div>
            <ul className="border-t border-line">
              {services.map((service, index) => (
                <li key={service.slug} className="border-b border-line">
                  <Reveal delay={Math.min(index * 0.04, 0.16)}>
                    <Link
                      to={`/services#${service.slug}`}
                      className="group flex items-start gap-5 py-6 transition-colors sm:gap-7"
                    >
                      <span className="mt-1 w-6 shrink-0 text-[10px] font-semibold tracking-[0.16em] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1">
                        <span className="flex items-start justify-between gap-4">
                          <span className="font-display text-[16px] font-semibold leading-snug text-navy transition-colors group-hover:text-royal sm:text-[18px]">
                            {service.title}
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            className="mt-1 h-4 w-4 shrink-0 text-line-dark transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                          />
                        </span>
                        <span className="mt-1.5 block max-w-md text-[12.5px] leading-relaxed text-muted">
                          {service.summary}
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Link
              to="/services"
              className="mt-6 inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-royal transition-colors hover:text-navy"
            >
              More about technical services
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
