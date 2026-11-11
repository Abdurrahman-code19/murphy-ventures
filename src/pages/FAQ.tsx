import { MessageCircleQuestion } from "lucide-react";
import { Link } from "react-router-dom";
import { faqGroups } from "../data/faq";
import { useSeo } from "../hooks/useSeo";
import { breadcrumbSchema, faqSchema } from "../lib/schema";
import { buttonStyles } from "../components/shared/Button";
import { Container } from "../components/shared/Container";
import { CtaBand } from "../components/shared/CtaBand";
import { PageHero } from "../components/shared/PageHero";
import { Accordion } from "../components/shared/Accordion";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function FAQ() {
  const allItems = faqGroups.flatMap((group) => group.items);

  useSeo({
    title: "Frequently asked questions",
    description:
      "Answers about Murphy Ventures equipment, pricing, new and fairly used machines, repairs, workshop drop-off, technician visits and contact details in Lagos.",
    path: "/faq",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "FAQ", path: "/faq" },
      ]),
      faqSchema(allItems),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Frequently asked questions"
        title="Clear answers before you decide."
        description="What we supply, how pricing works, and how repairs are arranged. If your question is not covered here, the team is one call or message away."
        highlights={[
          "Equipment and condition questions",
          "Pricing and availability",
          "Workshop and on-site repairs",
        ]}
      />

      <section className="bg-ivory py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[230px_1fr] lg:gap-16">
            <nav aria-label="FAQ sections" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                On this page
              </p>
              <ul className="mt-4 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-l lg:border-line lg:pb-0">
                {faqGroups.map((group) => (
                  <li key={group.title} className="shrink-0">
                    <a
                      href={`#${slugify(group.title)}`}
                      className="block whitespace-nowrap rounded-full border border-line bg-white px-3.5 py-2 text-[11.5px] font-medium text-ink transition-colors hover:border-navy hover:text-navy lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:border-transparent lg:bg-transparent lg:py-2.5 lg:pl-4 lg:hover:border-gold lg:hover:text-navy"
                    >
                      {group.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="space-y-12">
              {faqGroups.map((group) => (
                <section
                  key={group.title}
                  id={slugify(group.title)}
                  aria-labelledby={`${slugify(group.title)}-heading`}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 text-gold-ink">
                      <MessageCircleQuestion aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <h2
                      id={`${slugify(group.title)}-heading`}
                      className="font-display text-[19px] font-semibold text-navy sm:text-[21px]"
                    >
                      {group.title}
                    </h2>
                  </div>
                  <Accordion items={group.items} defaultOpen={null} />
                </section>
              ))}

              <div className="rounded-[16px] border border-line bg-white p-6 sm:p-7">
                <h2 className="font-display text-[18px] font-semibold text-navy">
                  Still have a question?
                </h2>
                <p className="mt-2 max-w-lg text-[13px] leading-relaxed text-muted">
                  Tell us what you need — a machine, a price, or a repair. We will confirm the
                  details with you directly.
                </p>
                <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                  <Link to="/contact" className={buttonStyles("primary", "md")}>
                    Contact Murphy Ventures
                  </Link>
                  <Link to="/request-repair" className={buttonStyles("outline", "md")}>
                    Request a repair
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
