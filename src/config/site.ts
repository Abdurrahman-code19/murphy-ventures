/**
 * Central business configuration.
 *
 * Everything that may change — phone numbers, address, pricing guidance,
 * domain — lives here so the site never hardcodes contact details in components.
 */
export const site = {
  name: "Murphy Ventures",
  legalName: "Murphy Ventures Technical Services",
  category: "Banking Equipment, Office Equipment and Technical Services",
  tagline: "Reliable Equipment. Expert Technical Solutions.",
  motto: "Quality you can trust. Service you can rely on.",

  description:
    "Murphy Ventures supplies new and fairly used banking and office equipment — banknote counters, time recording machines, fireproof safes, counterfeit detectors and more — and provides equipment repairs in Lagos, Nigeria.",

  /** TODO: replace with the live domain before deployment. Used for canonical URLs, sitemap and social metadata. */
  url: "https://murphyventures.ng",

  address: {
    street: "208, Abaranje Road, Omo-Oye Bus Stop",
    locality: "Abaranje–Ikotun",
    region: "Lagos State",
    country: "Nigeria",
    full: "208, Abaranje Road, Omo-Oye Bus Stop, Abaranje–Ikotun, Lagos State, Nigeria.",
    mapQuery:
      "Murphy Ventures, 208 Abaranje Road, Omo-Oye Bus Stop, Abaranje-Ikotun, Lagos State, Nigeria",
  },

  /**
   * Both lines are kept configurable. The client initially described the first
   * number as WhatsApp, but this has not been independently verified.
   * Confirm the WhatsApp line before launch and update `whatsapp.number` only.
   */
  phones: [
    { label: "0802 331 0563", tel: "+2348023310563", note: "Primary line" },
    { label: "0807 410 0710", tel: "+2348074100710", note: "Alternate line" },
  ],

  whatsapp: {
    /** International format, digits only. TODO: confirm which line is WhatsApp. */
    number: "2348023310563",
    display: "0802 331 0563",
  },

  /** General equipment guidance only — never presented as the price of a specific product. */
  priceRange: {
    min: 120_000,
    max: 1_800_000,
  },
} as const;

export const maps = {
  embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    site.address.mapQuery,
  )}`,
};

export const mainNav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;
