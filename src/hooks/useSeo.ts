import { useEffect } from "react";
import { site } from "../config/site";

type MetaAttribute = "name" | "property";

function setMeta(attribute: MetaAttribute, key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export interface SeoInput {
  /** Page title. The brand suffix is added automatically when missing. */
  title: string;
  description: string;
  /** Route path, e.g. "/products". */
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

/**
 * Lightweight document-head management. Keeps a single H1 per page and unique
 * title, description, canonical, Open Graph and structured data.
 */
export function useSeo({
  title,
  description,
  path,
  image = "/images/branding/og-image.jpg",
  type = "website",
  jsonLd,
  noIndex = false,
}: SeoInput) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
    const url = `${site.url}${path}`;
    const absoluteImage = image.startsWith("http") ? image : `${site.url}${image}`;

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", absoluteImage);
    setMeta("property", "og:locale", "en_NG");
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", absoluteImage);
    setCanonical(url);

    const scriptId = "page-jsonld";
    document.getElementById(scriptId)?.remove();

    if (jsonLdString) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = scriptId;
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [title, description, path, image, type, noIndex, jsonLdString]);
}
