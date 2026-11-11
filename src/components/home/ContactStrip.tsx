import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { maps, site } from "../../config/site";
import { generalEnquiryMessage, whatsappLink } from "../../lib/whatsapp";
import { buttonStyles } from "../shared/Button";
import { Container } from "../shared/Container";
import { Eyebrow } from "../shared/Eyebrow";
import { MapPanel } from "../shared/MapPanel";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";

export function ContactStrip() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <Eyebrow className="mb-5">Visit or call</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-navy">
              Find us in
              <br />
              Abaranje–Ikotun.
            </h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-muted">
              Call before visiting for repairs or to check a specific machine, so we can confirm
              availability and the right arrangement for you.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                  <MapPin aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Address
                  </p>
                  <a
                    href={maps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[13px] leading-relaxed text-ink transition-colors hover:text-royal"
                  >
                    {site.address.street},<br />
                    {site.address.locality}, {site.address.region}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Telephone
                  </p>
                  <div className="mt-1 flex flex-col gap-1">
                    {site.phones.map((phone) => (
                      <a
                        key={phone.tel}
                        href={`tel:${phone.tel}`}
                        className="block py-1 text-[13px] font-medium text-ink transition-colors hover:text-royal"
                      >
                        {phone.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                  <Clock aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted">
                    Before you visit
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted">
                    Contact us to confirm product availability or a repair arrangement.
                  </p>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <a
                href={whatsappLink(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("primary", "md")}
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp us
              </a>
              <Link to="/contact" className={buttonStyles("outline", "md")}>
                Contact details
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <MapPanel />
        </div>
      </Container>
    </section>
  );
}
