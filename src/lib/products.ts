import { categories } from "../data/categories";
import { products } from "../data/products";
import type { Availability, Condition, Product } from "../types";
import { formatNaira } from "./utils";

export const conditionLabels: Record<Condition, string> = {
  new: "New",
  "fairly-used": "Fairly used",
  unknown: "Condition on request",
};

export const availabilityLabels: Record<Availability, string> = {
  available: "Available",
  unavailable: "Currently unavailable",
  unknown: "Availability on enquiry",
};

export function priceLabel(product: Product) {
  if (product.priceOnRequest || product.price === undefined) {
    return "Price on request";
  }
  return formatNaira(product.price);
}

/**
 * Locally stored product photos ship as a 1200w master and a 640w variant.
 * This builds the responsive srcSet so phones fetch the lighter file.
 */
export function productImageSrcSet(src: string) {
  const base = src.replace(/\.webp$/i, "");
  if (base === src) return undefined;
  return `${base}-640.webp 640w, ${src} 1200w`;
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCategoryProducts(category: string) {
  return products.filter((product) => product.category === category);
}

export function categoryCount(category: string) {
  return getCategoryProducts(category).length;
}

export const featuredProducts = products.filter((product) => product.featured);

export function getRelatedProducts(product: Product, limit = 3) {
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const fillers = products.filter(
    (item) =>
      item.id !== product.id && !sameCategory.some((related) => related.id === item.id),
  );
  return [...sameCategory, ...fillers.slice(0, Math.max(0, limit - sameCategory.length))].slice(
    0,
    limit,
  );
}

export function categoryName(slug: string) {
  return categories.find((category) => category.slug === slug)?.name ?? slug;
}
