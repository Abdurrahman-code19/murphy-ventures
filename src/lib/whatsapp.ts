import { site } from "../config/site";

export type ServiceArrangement = "workshop" | "visit";
export type ContactMethod = "phone" | "whatsapp" | "either";

export const arrangementLabels: Record<ServiceArrangement, string> = {
  workshop: "Bring equipment to the workshop",
  visit: "Request a technician visit",
};

export const contactMethodLabels: Record<ContactMethod, string> = {
  phone: "Phone call",
  whatsapp: "WhatsApp",
  either: "Either phone or WhatsApp",
};

/** Build a wa.me URL. The number is centralised in `src/config/site.ts`. */
export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export const telLink = (tel: string) => `tel:${tel}`;

export function productEnquiryMessage(productName: string, model?: string) {
  const modelLine = model ? ` (${model})` : "";
  return `Hello Murphy Ventures, I am interested in the ${productName}${modelLine}. Please provide the current price and availability.`;
}

export function generalEnquiryMessage() {
  return "Hello Murphy Ventures, I would like to make an enquiry about your banking and office equipment.";
}

export interface RepairMessageInput {
  fullName: string;
  phone: string;
  equipmentType: string;
  equipmentBrandModel?: string;
  faultDescription: string;
  serviceArrangement: ServiceArrangement;
  contactMethod: ContactMethod;
}

export function repairRequestMessage(data: RepairMessageInput) {
  return [
    "Hello Murphy Ventures, I would like to request a repair.",
    "",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Equipment: ${data.equipmentType}`,
    `Brand / model: ${data.equipmentBrandModel?.trim() || "Not specified"}`,
    "",
    "Fault description:",
    data.faultDescription,
    "",
    `Preferred arrangement: ${arrangementLabels[data.serviceArrangement]}`,
    `Preferred contact: ${contactMethodLabels[data.contactMethod]}`,
    "",
    "I prepared this request on the Murphy Ventures website. Nothing has been sent yet.",
  ].join("\n");
}

export interface ContactMessageInput {
  fullName: string;
  phone: string;
  topic: string;
  message: string;
  contactMethod: ContactMethod;
}

export function contactMessage(data: ContactMessageInput) {
  return [
    "Hello Murphy Ventures, I have an enquiry from your website.",
    "",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Topic: ${data.topic}`,
    `Preferred contact: ${contactMethodLabels[data.contactMethod]}`,
    "",
    data.message,
    "",
    "I prepared this message on the Murphy Ventures website. Nothing has been sent yet.",
  ].join("\n");
}
