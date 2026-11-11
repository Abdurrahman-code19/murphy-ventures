import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { maps, site } from "../config/site";
import { useSeo } from "../hooks/useSeo";
import { breadcrumbSchema } from "../lib/schema";
import {
  contactSchema,
  contactTopics,
  type ContactFormValues,
} from "../lib/validation";
import {
  contactMessage,
  contactMethodLabels,
  whatsappLink,
  type ContactMethod,
} from "../lib/whatsapp";
import { Eyebrow } from "../components/shared/Eyebrow";
import { buttonStyles } from "../components/shared/Button";
import { Container } from "../components/shared/Container";
import { PageHero } from "../components/shared/PageHero";
import { MapPanel } from "../components/shared/MapPanel";
import { WhatsAppIcon } from "../components/shared/WhatsAppIcon";
import { Select, TextArea, TextInput } from "../components/forms/Fields";
import { RadioCards } from "../components/forms/RadioCards";
import { FormHandoff } from "../components/forms/FormHandoff";

const contactCards = [
  {
    icon: MapPin,
    label: "Address",
    lines: [
      site.address.street,
      `${site.address.locality}, ${site.address.region}`,
      site.address.country,
    ],
    action: { label: "Get directions", href: maps.directionsUrl, external: true },
  },
  {
    icon: Phone,
    label: "Telephone",
    lines: site.phones.map((phone) => `${phone.label} · ${phone.note}`),
    action: { label: "Call the team", href: `tel:${site.phones[0].tel}`, external: false },
  },
];

export default function Contact() {
  const [prepared, setPrepared] = useState<{ message: string; href: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      topic: "",
      message: "",
      contactMethod: undefined as unknown as ContactMethod,
    },
  });

  useSeo({
    title: "Contact Murphy Ventures",
    description:
      "Contact Murphy Ventures in Abaranje–Ikotun, Lagos. Call 0802 331 0563 or 0807 410 0710, send a WhatsApp message, or prepare an enquiry on the website.",
    path: "/contact",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ]),
  });

  const contactOptions = useMemo(
    () =>
      (Object.keys(contactMethodLabels) as ContactMethod[]).map((value) => ({
        value,
        label: contactMethodLabels[value],
      })),
    [],
  );

  function onSubmit(values: ContactFormValues) {
    const message = contactMessage(values);
    setPrepared({ message, href: whatsappLink(message) });
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function editMessage() {
    setPrepared(null);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Murphy Ventures."
        description="Call, message or visit us in Abaranje–Ikotun. Tell us what you need and we will confirm pricing, availability or a repair arrangement with you."
        highlights={[
          "0802 331 0563 · Primary line",
          "0807 410 0710 · Alternate line",
          "Abaranje–Ikotun, Lagos State",
        ]}
        actions={
          <>
            <a
              href={`tel:${site.phones[0].tel}`}
              className={buttonStyles("gold", "md")}
            >
              <Phone aria-hidden="true" className="h-4 w-4" />
              Call {site.phones[0].label}
            </a>
            <Link to="/request-repair" className={buttonStyles("outline-light", "md")}>
              Request a repair
            </Link>
          </>
        }
      />

      <section className="bg-ivory py-12 sm:py-16">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.label}
                  className="flex flex-col rounded-[16px] border border-line bg-white p-5 sm:p-6"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <p className="mt-4 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {card.label}
                  </p>
                  <div className="mt-2 space-y-1 text-[12.5px] leading-relaxed text-ink">
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                  <a
                    href={card.action.href}
                    {...(card.action.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-royal transition-colors hover:text-navy"
                  >
                    {card.action.label}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </a>
                </article>
              );
            })}

            <article className="flex flex-col rounded-[16px] border border-navy bg-navy p-5 text-ivory sm:p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-gold-soft">
                <WhatsAppIcon className="h-4 w-4" />
              </span>
              <p className="mt-4 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
                WhatsApp
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">
                Send a message with the machine you need, or the fault you are dealing with.
              </p>
              <a
                href={whatsappLink(
                  "Hello Murphy Ventures, I would like to make an enquiry about your banking and office equipment.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-gold-soft transition-colors hover:text-ivory"
              >
                Open WhatsApp
                <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </article>

            <article className="flex flex-col rounded-[16px] border border-line bg-white p-5 sm:p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                <Clock aria-hidden="true" className="h-4 w-4" />
              </span>
              <p className="mt-4 text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted">
                Before you visit
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink">
                Opening hours have not been published. Contact us first to confirm a convenient
                time, product availability or a repair arrangement.
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted">
                <Mail aria-hidden="true" className="h-3.5 w-3.5" />
                Email not yet published
              </p>
            </article>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
            <div ref={formRef} className="scroll-mt-28">
              <div className="rounded-[18px] border border-line bg-white p-6 shadow-[0_1px_2px_rgba(9,27,59,0.04)] sm:p-8">
                {prepared ? (
                  <FormHandoff
                    title="Your message is ready"
                    message={prepared.message}
                    whatsappHref={prepared.href}
                    onEdit={editMessage}
                    editLabel="Edit my message"
                  />
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Eyebrow className="mb-3">Send an enquiry</Eyebrow>
                        <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-navy sm:text-[25px]">
                          What can we help with?
                        </h2>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                        <Send aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>

                    <p className="mt-4 text-[13px] leading-relaxed text-muted">
                      Share a few details and we will prepare a WhatsApp message for you. This
                      form does not send anything automatically — you stay in control of the
                      message.
                    </p>

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <TextInput
                          id="contact-name"
                          label="Full name"
                          required
                          autoComplete="name"
                          placeholder="e.g. Adebayo Okafor"
                          error={errors.fullName?.message}
                          {...register("fullName")}
                        />
                        <TextInput
                          id="contact-phone"
                          label="Phone number"
                          required
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          placeholder="e.g. 0802 331 0563"
                          hint="A Nigerian mobile or landline number we can reach you on."
                          error={errors.phone?.message}
                          {...register("phone")}
                        />
                      </div>

                      <Select
                        id="contact-topic"
                        label="What is your enquiry about?"
                        required
                        error={errors.topic?.message}
                        {...register("topic")}
                      >
                        <option value="">Select a topic</option>
                        {contactTopics.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </Select>

                      <TextArea
                        id="contact-message"
                        label="Your message"
                        required
                        placeholder="For example: I am looking for a fairly used banknote counting machine. Please confirm the available models and prices."
                        hint="Include a brand or model if you have one in mind."
                        error={errors.message?.message}
                        {...register("message")}
                      />

                      <RadioCards
                        name="contactMethod"
                        legend="How should we contact you?"
                        required
                        registration={register("contactMethod")}
                        error={errors.contactMethod?.message}
                        options={contactOptions}
                      />

                      <div className="rounded-[10px] border border-line bg-ivory/70 p-4 text-[11.5px] leading-relaxed text-muted">
                        <p className="flex items-start gap-2.5">
                          <CheckCircle2
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-ink"
                          />
                          <span>
                            Your message is prepared locally and will not be submitted anywhere.{" "}
                            <strong className="font-semibold text-ink">
                              You send it yourself through WhatsApp.
                            </strong>
                          </span>
                        </p>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={buttonStyles("primary", "lg", "w-full sm:w-auto")}
                      >
                        <Send aria-hidden="true" className="h-4 w-4" />
                        Prepare my message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <MapPanel />
              <div className="rounded-[16px] border border-line bg-white p-5 sm:p-6">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                  Directions
                </p>
                <address className="mt-2 text-[12.5px] not-italic leading-relaxed text-ink">
                  {site.address.full}
                </address>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <a
                    href={maps.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles("outline", "sm", "w-full sm:w-auto")}
                  >
                    <MapPin aria-hidden="true" className="h-3.5 w-3.5" />
                    Open in Maps
                  </a>
                  <Link
                    to="/faq"
                    className={buttonStyles("ghost", "sm", "w-full sm:w-auto")}
                  >
                    Read the FAQ
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
