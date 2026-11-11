import { ArrowUpRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { site } from "../../config/site";
import { generalEnquiryMessage, whatsappLink } from "../../lib/whatsapp";
import { buttonStyles } from "../shared/Button";
import { Container } from "../shared/Container";
import { Eyebrow } from "../shared/Eyebrow";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";

export function CtaBand({
  eyebrow = "Talk to our team",
  title = "Tell us what your office needs.",
  description = "Send an enquiry with the equipment you have in mind, or tell us about a machine that needs attention. We will confirm pricing, availability and the next step with you.",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-ivory on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-60" />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-40 h-[420px] w-[420px] rounded-full border border-gold/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 right-24 h-[300px] w-[300px] rounded-full border border-gold/10"
      />
      <Container className="relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <Eyebrow tone="light" className="mb-5">
              {eyebrow}
            </Eyebrow>
            <h2 className="max-w-2xl font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ivory">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/60">
              {description}
            </p>
          </div>

          <div className="lg:justify-self-end">
            <div className="flex flex-col gap-2.5 sm:flex-row lg:flex-col lg:items-stretch">
              <a
                href={whatsappLink(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles("gold", "lg", "w-full sm:w-auto lg:w-full")}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${site.phones[0].tel}`}
                className={buttonStyles("outline-light", "lg", "w-full sm:w-auto lg:w-full")}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {site.phones[0].label}
              </a>
            </div>
            <Link
              to="/request-repair"
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-gold-soft transition-colors hover:text-ivory"
            >
              Or request a repair
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
            <p className="mt-4 text-[11px] text-white/40">
              Prices and availability are confirmed on enquiry.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
