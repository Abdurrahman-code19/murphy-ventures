import { categories } from "../data/categories";
import { site } from "../config/site";
import type { Product } from "../types";

export function localBusinessSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    logo: `${site.url}/images/branding/logo-full.webp`,
    image: `${site.url}/images/branding/og-image.jpg`,
    telephone: site.phones.map((phone) => phone.tel),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: "NG",
    },
    areaServed: {
      "@type": "City",
      name: "Lagos",
    },
    slogan: site.motto,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Banking & office equipment",
      itemListElement: categories.map((category) => ({
        "@type": "OfferCatalog",
        name: category.name,
        description: category.description,
      })),
    },
  };
}

export function productSchema(product: Product): Record<string, unknown> {
  const brand =
    product.brand && product.brand !== "Brands vary"
      ? { "@type": "Brand", name: product.brand }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: categories.find((category) => category.slug === product.category)?.name,
    image: `${site.url}${product.images[0]}`,
    url: `${site.url}/products/${product.slug}`,
    ...(brand ? { brand } : {}),
    ...(product.model ? { model: product.model } : {}),
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
