import { z } from "zod";

export function isValidNigerianPhone(value: string) {
  const digits = value.replace(/[\s().-]/g, "");
  if (!/^\+?\d{7,15}$/.test(digits)) return false;

  const local = digits.startsWith("+234")
    ? `0${digits.slice(4)}`
    : digits.startsWith("234")
      ? `0${digits.slice(3)}`
      : digits;

  return /^0[789]\d{9}$/.test(local);
}

const phoneField = z
  .string()
  .trim()
  .min(1, "Enter a phone number so we can reach you.")
  .refine(isValidNigerianPhone, {
    message: "Enter a valid Nigerian phone number, e.g. 0802 331 0563.",
  });

export const equipmentTypes = [
  "Banknote counting machine",
  "Time recording machine",
  "Time stamp machine",
  "Fireproof safe",
  "Counterfeit / UV money detector",
  "Printing calculator",
  "Cheque writer",
  "Other office equipment",
  "Other",
] as const;

export const contactTopics = [
  "Product enquiry",
  "Pricing & availability",
  "Repair enquiry",
  "General enquiry",
] as const;

export const repairSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Please keep your name under 80 characters."),
  phone: phoneField,
  equipmentType: z
    .string()
    .min(1, "Select the type of equipment.")
    .max(80, "Please keep this under 80 characters."),
  equipmentBrandModel: z
    .string()
    .trim()
    .max(120, "Please keep the brand and model under 120 characters.")
    .optional(),
  faultDescription: z
    .string()
    .trim()
    .min(15, "Please describe the fault in a little more detail.")
    .max(1200, "Please keep the description under 1,200 characters."),
  serviceArrangement: z.enum(["workshop", "visit"], {
    required_error: "Choose how you would like to proceed.",
    invalid_type_error: "Choose how you would like to proceed.",
  }),
  contactMethod: z.enum(["phone", "whatsapp", "either"], {
    required_error: "Choose how you would like to be contacted.",
    invalid_type_error: "Choose how you would like to be contacted.",
  }),
});

export type RepairFormValues = z.infer<typeof repairSchema>;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Please keep your name under 80 characters."),
  phone: phoneField,
  topic: z
    .string()
    .min(1, "Select a topic for your enquiry.")
    .max(80, "Please keep this under 80 characters."),
  message: z
    .string()
    .trim()
    .min(15, "Please add a little more detail to your message.")
    .max(1200, "Please keep your message under 1,200 characters."),
  contactMethod: z.enum(["phone", "whatsapp", "either"], {
    required_error: "Choose how you would like to be contacted.",
    invalid_type_error: "Choose how you would like to be contacted.",
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
