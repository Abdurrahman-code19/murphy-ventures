import type { Category } from "../types";

export const categories: Category[] = [
  {
    slug: "cash-management",
    name: "Cash Management Equipment",
    shortName: "Cash Management",
    description:
      "Banknote counting machines and cash-handling equipment for banks, businesses and busy offices.",
    image: "/images/products/banknote-counter.svg",
    icon: "banknote",
  },
  {
    slug: "time-recording",
    name: "Time Recording Equipment",
    shortName: "Time Recording",
    description:
      "Time recording and time stamp machines for attendance tracking and document control.",
    image: "/images/products/time-recorder.svg",
    icon: "clock",
  },
  {
    slug: "security",
    name: "Security Equipment",
    shortName: "Security",
    description:
      "Fireproof safes and secure storage for cash, documents and other valuables.",
    image: "/images/products/safe.svg",
    icon: "shield",
  },
  {
    slug: "money-verification",
    name: "Money Verification Equipment",
    shortName: "Money Verification",
    description:
      "Counterfeit detection and note verification equipment for confident cash handling.",
    image: "/images/products/money-detector.svg",
    icon: "scan",
  },
  {
    slug: "office-equipment",
    name: "Office Equipment",
    shortName: "Office Equipment",
    description:
      "Printing calculators, cheque writers and dependable office machines for daily operations.",
    image: "/images/products/calculator.svg",
    icon: "calculator",
  },
];

export const getCategory = (slug: string) =>
  categories.find((category) => category.slug === slug);
