import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Clock, MapPin, MessageSquare, Phone, Wrench } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { site } from "../config/site";
import {
  equipmentTypes,
  repairSchema,
  type RepairFormValues,
} from "../lib/validation";
import {
  arrangementLabels,
  contactMethodLabels,
  repairRequestMessage,
  whatsappLink,
  type ContactMethod,
  type ServiceArrangement,
} from "../lib/whatsapp";
import { useSeo } from "../hooks/useSeo";
import { breadcrumbSchema } from "../lib/schema";
import { Button, buttonStyles } from "../components/shared/Button";
import { Container } from "../components/shared/Container";
import { Eyebrow } from "../components/shared/Eyebrow";
import { PageHero } from "../components/shared/PageHero";
import { Select, TextArea, TextInput } from "../components/forms/Fields";
import { RadioCards } from "../components/forms/RadioCards";
import { FormHandoff } from "../components/forms/FormHandoff";

const fallbackEquipment = "Other";

/** Keyword aliases so shared or hand-written links still preselect sensibly. */
const equipmentAliases: { keywords: string[]; value: (typeof equipmentTypes)[number] }[] = [
  { keywords: ["banknote", "bank note", "note counter", "cash counter", "counting"], value: "Banknote counting machine" },
  { keywords: ["time recording", "time recorder", "attendance", "clocking"], value: "Time recording machine" },
  { keywords: ["time stamp", "timestamp", "date stamp"], value: "Time stamp machine" },
  { keywords: ["safe", "vault"], value: "Fireproof safe" },
  { keywords: ["detector", "counterfeit", "uv", "fake note"], value: "Counterfeit / UV money detector" },
  { keywords: ["calculator", "printing calculator"], value: "Printing calculator" },
  { keywords: ["cheque", "check writer"], value: "Cheque writer" },
  { keywords: ["office", "printer", "shredder", "laminator"], value: "Other office equipment" },
];

function resolveEquipment(value: string | null) {
  if (!value) return "";
  const normalised = value.trim().toLowerCase();
  if (!normalised) return "";

  const exact = equipmentTypes.find((item) => item.toLowerCase() === normalised);
  if (exact) return exact;

  const partial = equipmentTypes.find(
    (item) =>
      normalised.includes(item.toLowerCase()) || item.toLowerCase().includes(normalised),
  );
  if (partial) return partial;

  const alias = equipmentAliases.find((entry) =>
    entry.keywords.some((keyword) => normalised.includes(keyword)),
  );
  if (alias) return alias.value;

  return fallbackEquipment;
}

const enquiryChecklist = [
  "The equipment type and brand or model",
  "What the machine is doing, or not doing",
  "Whether you prefer a workshop drop-off or a visit",
];

export default function RequestRepair() {
  const [searchParams] = useSearchParams();
  const equipmentParam = searchParams.get("equipment");
  const prefilledEquipment = useMemo(() => resolveEquipment(equipmentParam), [equipmentParam]);

  const [prepared, setPrepared] = useState<{ message: string; href: string } | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RepairFormValues>({
    resolver: zodResolver(repairSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      phone: "",
      equipmentType: prefilledEquipment,
      equipmentBrandModel: "",
      faultDescription: "",
      serviceArrangement: undefined as unknown as ServiceArrangement,
      contactMethod: undefined as unknown as ContactMethod,
    },
  });

  useEffect(() => {
    if (prefilledEquipment) {
      reset((values) => ({ ...values, equipmentType: prefilledEquipment }));
    }
  }, [prefilledEquipment, reset]);

  useSeo({
    title: "Request a repair",
    description:
      "Prepare a repair request for banking and office equipment. Share the equipment type, fault and preferred arrangement — nothing is sent until you open WhatsApp and press send.",
    path: "/request-repair",
    jsonLd: breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Request a repair", path: "/request-repair" },
    ]),
  });

  function onSubmit(values: RepairFormValues) {
    const message = repairRequestMessage(values);
    setPrepared({ message, href: whatsappLink(message) });
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  function editRequest() {
    setPrepared(null);
    window.setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  return (
    <>
      <PageHero
        eyebrow="Technical services"
        title="Request a repair."
        description="Tell us what the machine is doing and how you would like to proceed. We will prepare a WhatsApp message with your details — you send it when you are ready."
        highlights={[
          "Workshop drop-off in Abaranje–Ikotun",
          "On-site technician visits on request",
          "Banknote counters, time machines, safes and more",
        ]}
        actions={
          <a href={`tel:${site.phones[0].tel}`} className={buttonStyles("outline-light", "md")}>
            <Phone aria-hidden="true" className="h-4 w-4" />
            Call {site.phones[0].label}
          </a>
        }
      />

      <section className="bg-ivory py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
            <div ref={formRef} className="scroll-mt-28">
              <div className="rounded-[18px] border border-line bg-white p-6 shadow-[0_1px_2px_rgba(9,27,59,0.04)] sm:p-8">
                {prepared ? (
                  <FormHandoff
                    title="Your repair request is ready"
                    message={prepared.message}
                    whatsappHref={prepared.href}
                    onEdit={editRequest}
                    editLabel="Edit request details"
                  />
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Eyebrow className="mb-3">Repair request</Eyebrow>
                        <h2 className="font-display text-[22px] font-semibold tracking-[-0.02em] text-navy sm:text-[25px]">
                          Tell us about the equipment
                        </h2>
                      </div>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                        <Wrench aria-hidden="true" className="h-4.5 w-4.5" />
                      </span>
                    </div>

                    <p className="mt-4 text-[13px] leading-relaxed text-muted">
                      Fields marked with{" "}
                      <span className="font-semibold text-gold-ink" aria-hidden="true">
                        *
                      </span>{" "}
                      are required. This form prepares a WhatsApp message only — it does not book a
                      repair or send anything automatically.
                    </p>

                    {prefilledEquipment ? (
                      <p className="mt-4 flex items-start gap-2.5 rounded-[10px] border border-gold/30 bg-gold/10 px-3.5 py-2.5 text-[11.5px] leading-relaxed text-ink">
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-ink"
                        />
                        Equipment type pre-selected from the service you chose. You can change it
                        below.
                      </p>
                    ) : null}

                    <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <TextInput
                          id="repair-name"
                          label="Full name"
                          required
                          autoComplete="name"
                          placeholder="e.g. Adebayo Okafor"
                          error={errors.fullName?.message}
                          {...register("fullName")}
                        />
                        <TextInput
                          id="repair-phone"
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

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Select
                          id="repair-equipment"
                          label="Equipment type"
                          required
                          error={errors.equipmentType?.message}
                          {...register("equipmentType")}
                        >
                          <option value="">Select equipment type</option>
                          {equipmentTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </Select>
                        <TextInput
                          id="repair-brand"
                          label="Brand and model"
                          autoComplete="off"
                          placeholder="e.g. Targetmax TL-50"
                          hint="Optional, but it helps us prepare."
                          error={errors.equipmentBrandModel?.message}
                          {...register("equipmentBrandModel")}
                        />
                      </div>

                      <TextArea
                        id="repair-fault"
                        label="What is the fault?"
                        required
                        placeholder="Describe what the machine is doing — for example, it jams after a few notes, the display does not come on, or the safe will not open."
                        hint="Include any error messages or recent changes if you can."
                        error={errors.faultDescription?.message}
                        {...register("faultDescription")}
                      />

                      <RadioCards
                        name="serviceArrangement"
                        legend="Preferred arrangement"
                        required
                        hint="Choose the option that suits you. The final arrangement is confirmed by our team."
                        registration={register("serviceArrangement")}
                        error={errors.serviceArrangement?.message}
                        options={(
                          Object.keys(arrangementLabels) as ServiceArrangement[]
                        ).map((value) => ({
                          value,
                          label: arrangementLabels[value],
                          description:
                            value === "workshop"
                              ? "Bring the equipment to our Abaranje–Ikotun workshop."
                              : "Ask us to assess the equipment at your location.",
                        }))}
                      />

                      <RadioCards
                        name="contactMethod"
                        legend="How should we contact you?"
                        required
                        registration={register("contactMethod")}
                        error={errors.contactMethod?.message}
                        options={(
                          Object.keys(contactMethodLabels) as ContactMethod[]
                        ).map((value) => ({
                          value,
                          label: contactMethodLabels[value],
                        }))}
                      />

                      <div className="rounded-[10px] border border-line bg-ivory/70 p-4 text-[11.5px] leading-relaxed text-muted">
                        <p className="flex items-start gap-2.5">
                          <MessageSquare
                            aria-hidden="true"
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-ink"
                          />
                          <span>
                            Next, we will prepare your request as a WhatsApp message.{" "}
                            <strong className="font-semibold text-ink">
                              Nothing is sent until you open WhatsApp and press send.
                            </strong>
                          </span>
                        </p>
                      </div>

                      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
                        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                          Prepare my request
                        </Button>
                        <Link
                          to="/services"
                          className="inline-flex items-center justify-center gap-1.5 px-2 py-2 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-navy"
                        >
                          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                          Back to services
                        </Link>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-[18px] border border-line bg-white p-6 sm:p-7">
                <Eyebrow className="mb-3">Before you send</Eyebrow>
                <h2 className="font-display text-[18px] font-semibold text-navy">
                  A complete request gets a faster answer.
                </h2>
                <ul className="mt-4 space-y-3">
                  {enquiryChecklist.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[12.5px] leading-snug text-muted"
                    >
                      <CheckCircle2
                        aria-hidden="true"
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[18px] border border-navy bg-navy p-6 text-ivory sm:p-7">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-soft">
                  Prefer to talk?
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/60">
                  Call the team directly and describe the fault. We can advise on whether a
                  workshop drop-off or a visit makes sense.
                </p>
                <ul className="mt-4 space-y-2.5">
                  {site.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className="flex items-center gap-2.5 text-[13.5px] font-medium text-ivory transition-colors hover:text-gold-soft"
                      >
                        <Phone aria-hidden="true" className="h-4 w-4 text-gold" />
                        {phone.label}
                        <span className="text-[10px] font-normal uppercase tracking-[0.12em] text-white/35">
                          {phone.note}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[18px] border border-line bg-white p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ivory-deep text-gold-ink">
                    <MapPin aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[12.5px] font-semibold text-navy">Workshop address</p>
                    <address className="mt-1 text-[12px] not-italic leading-relaxed text-muted">
                      {site.address.street},<br />
                      {site.address.locality}, {site.address.region}
                    </address>
                  </div>
                </div>
                <p className="mt-4 flex items-start gap-2.5 border-t border-line pt-4 text-[11.5px] leading-relaxed text-muted">
                  <Clock aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-ink" />
                  Contact us before travelling so we can confirm the arrangement and what to
                  expect.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
