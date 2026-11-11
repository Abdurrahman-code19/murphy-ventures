import { ArrowUpRight, BadgeCheck, Layers, LifeBuoy, MapPin, Recycle, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../shared/Container";
import { Eyebrow } from "../shared/Eyebrow";
import { Reveal } from "../shared/Reveal";

const reasons = [
  {
    icon: Layers,
    title: "Equipment and repairs in one place",
    description:
      "Buy the machine and keep it running with the same team — banking equipment, office machines and maintenance.",
  },
  {
    icon: Recycle,
    title: "New and fairly used options",
    description:
      "Choose the condition that fits your budget. We confirm the exact condition of each item before you commit.",
  },
  {
    icon: BadgeCheck,
    title: "Straight answers on pricing",
    description:
      "Individual prices are confirmed per item. No published figure that may not apply to the machine you need.",
  },
  {
    icon: Wrench,
    title: "Workshop or on-site",
    description:
      "Bring faulty equipment to Abaranje–Ikotun, or ask us to arrange a technician visit to your location.",
  },
  {
    icon: LifeBuoy,
    title: "Support after the purchase",
    description:
      "After-sales support is part of the service. Repair and maintenance enquiries are welcome after purchase.",
  },
  {
    icon: MapPin,
    title: "A local point of contact",
    description:
      "A Lagos-based team you can call, message on WhatsApp, or visit in person at our workshop.",
  },
];

export function WhyChoose() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <div className="self-start lg:sticky lg:top-28">
            <Eyebrow className="mb-5">Why Murphy Ventures</Eyebrow>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-navy">
              Built on equipment
              <br />
              you can rely on.
            </h2>
            <p className="mt-5 max-w-sm text-[14.5px] leading-relaxed text-muted">
              “Quality you can trust, service you can rely on.” It is not just a motto — it is how
              we approach every sale and every repair.
            </p>
            <Link
              to="/contact"
              className="mt-7 inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-royal transition-colors hover:text-navy"
            >
              Speak with our team
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <ul className="grid gap-x-10 sm:grid-cols-2">
            {reasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <li
                  key={reason.title}
                  className="group border-t border-line py-6 transition-colors hover:border-gold"
                >
                  <Reveal delay={Math.min(index * 0.04, 0.2)}>
                    <div className="flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                        <Icon aria-hidden="true" className="h-4 w-4" />
                      </span>
                      <span className="text-[9.5px] font-semibold tracking-[0.2em] text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[15.5px] font-semibold leading-snug text-navy">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-muted">
                      {reason.description}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}
