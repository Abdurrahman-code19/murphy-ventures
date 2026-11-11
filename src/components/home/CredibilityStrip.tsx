import { MapPin, PackageCheck, ShieldCheck, Wrench } from "lucide-react";
import { Container } from "../shared/Container";

const items = [
  {
    icon: PackageCheck,
    title: "New & fairly used",
    description: "Equipment options to suit different budgets.",
  },
  {
    icon: Wrench,
    title: "Repairs & maintenance",
    description: "Note counters, time machines, safes and more.",
  },
  {
    icon: ShieldCheck,
    title: "Workshop or on-site",
    description: "Bring equipment in, or request a technician visit.",
  },
  {
    icon: MapPin,
    title: "Lagos-based support",
    description: "Abaranje–Ikotun, Lagos State, Nigeria.",
  },
];

export function CredibilityStrip() {
  return (
    <section aria-label="What Murphy Ventures offers" className="border-y border-line bg-white">
      <Container>
        <ul className="grid divide-y divide-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="flex items-start gap-3.5 py-6 lg:px-6 lg:py-7"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                  <Icon aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="font-display text-[13.5px] font-semibold text-navy">
                    {item.title}
                  </p>
                  <p className="mt-1 text-[11.5px] leading-snug text-muted">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
