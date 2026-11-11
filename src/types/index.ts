export type Condition = "new" | "fairly-used" | "unknown";
export type Availability = "available" | "unavailable" | "unknown";

export interface Specification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand?: string;
  model?: string;
  condition: Condition;
  price?: number;
  priceOnRequest: boolean;
  availability: Availability;
  summary: string;
  description: string;
  specifications?: Specification[];
  images: string[];
  imageAlt: string;
  featured: boolean;
}

export interface Category {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  icon: "banknote" | "clock" | "shield" | "scan" | "calculator";
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroup {
  title: string;
  items: FaqItem[];
}
