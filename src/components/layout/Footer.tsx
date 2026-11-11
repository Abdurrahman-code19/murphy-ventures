import { ArrowUp, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { mainNav, maps, site } from "../../config/site";
import { whatsappLink, generalEnquiryMessage } from "../../lib/whatsapp";
import { Container } from "../shared/Container";
import { Logo } from "../shared/Logo";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";

const linkClass = "text-[13.5px] text-white/60 transition-colors hover:text-gold-soft";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-ivory on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-40" />
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-52 h-[420px] w-[420px] rounded-full border border-gold/10"
      />
      <Container className="relative">
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-20">
          <div>
            <Link to="/" aria-label="Murphy Ventures home" className="inline-block">
              <Logo tone="dark" />
            </Link>
            <p className="mt-6 max-w-xs text-[13.5px] leading-relaxed text-white/55">
              Banking and office equipment supplied, installed and repaired in Lagos —
              with dependable technical support behind every machine.
            </p>
            <p className="mt-5 font-display text-[13px] font-medium italic text-gold-soft">
              “{site.motto}”
            </p>
            <a
              href={whatsappLink(generalEnquiryMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[12px] font-semibold text-ivory transition-colors hover:border-gold hover:text-gold-soft"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp enquiry
            </a>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/request-repair" className={linkClass}>
                  Request a repair
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Equipment categories">
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
              Equipment
            </h2>
            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link to={`/products?category=${category.slug}`} className={linkClass}>
                    {category.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-soft">
              Visit & contact
            </h2>
            <address className="mt-5 not-italic">
              <a
                href={maps.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 text-[13.5px] leading-relaxed text-white/60 transition-colors hover:text-gold-soft"
              >
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  {site.address.street}
                  <br />
                  {site.address.locality}, {site.address.region}
                  <br />
                  {site.address.country}
                </span>
              </a>
            </address>
            <ul className="mt-5 space-y-3">
              {site.phones.map((phone) => (
                <li key={phone.tel}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="flex items-center gap-3 py-1 text-[13.5px] text-white/70 transition-colors hover:text-gold-soft"
                  >
                    <Phone aria-hidden="true" className="h-4 w-4 text-gold" />
                    {phone.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[11.5px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="max-w-md sm:text-right">
            Product pricing, condition and availability are confirmed on enquiry.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 self-start text-white/50 transition-colors hover:text-gold-soft sm:self-auto"
          >
            Back to top
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
          </button>
        </div>
      </Container>
    </footer>
  );
}
