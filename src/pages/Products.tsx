import { ArrowUpRight, SearchX } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { site } from "../config/site";
import { useSeo } from "../hooks/useSeo";
import { breadcrumbSchema } from "../lib/schema";
import { categoryName } from "../lib/products";
import { formatNaira } from "../lib/utils";
import { generalEnquiryMessage, whatsappLink } from "../lib/whatsapp";
import { buttonStyles } from "../components/shared/Button";
import { Container } from "../components/shared/Container";
import { CtaBand } from "../components/shared/CtaBand";
import { PageHero } from "../components/shared/PageHero";
import { Reveal } from "../components/shared/Reveal";
import { WhatsAppIcon } from "../components/shared/WhatsAppIcon";
import {
  ProductFilters,
  type ConditionFilter,
} from "../components/products/ProductFilters";
import { ProductCard } from "../components/products/ProductCard";

const counts = Object.fromEntries(
  categories.map((category) => [
    category.slug,
    products.filter((product) => product.category === category.slug).length,
  ]),
);

const validConditions: ConditionFilter[] = ["all", "new", "fairly-used"];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "all";
  const category = categories.some((item) => item.slug === categoryParam)
    ? categoryParam
    : "all";
  const conditionParam = searchParams.get("condition") ?? "all";
  const condition = validConditions.includes(conditionParam as ConditionFilter)
    ? (conditionParam as ConditionFilter)
    : "all";
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
  }, [category, condition]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesCondition = condition === "all" || product.condition === condition;
      const haystack = [
        product.name,
        product.brand,
        product.model,
        product.summary,
        product.description,
        categoryName(product.category),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      const matchesSearch = !query || haystack.includes(query);
      return matchesCategory && matchesCondition && matchesSearch;
    });
  }, [category, condition, search]);

  useSeo({
    title: "Equipment catalogue — banking & office machines",
    description:
      "Browse banknote counting machines, time recording machines, fireproof safes, counterfeit detectors, printing calculators and office equipment from Murphy Ventures in Lagos.",
    path: "/products",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Murphy Ventures equipment catalogue",
        itemListElement: products.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: product.name,
          url: `${site.url}/products/${product.slug}`,
        })),
      },
    ],
  });

  function updateParam(key: "category" | "condition", value: string) {
    const next = new URLSearchParams(searchParams);
    if (value === "all") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  }

  function resetFilters() {
    setSearch("");
    setSearchParams(new URLSearchParams(), { replace: true });
  }

  const hasActiveFilters =
    search.trim().length > 0 || category !== "all" || condition !== "all";

  return (
    <>
      <PageHero
        eyebrow="Equipment catalogue"
        title="Equipment for banking, cash handling and the office."
        description="Explore the machines Murphy Ventures supplies. Every listing is a reference for enquiry — model, condition, price and availability are confirmed with you directly."
        highlights={[
          "New and fairly used equipment",
          "Banknote counters, safes and detectors",
          "Time machines and office equipment",
        ]}
      />

      <div className="border-b border-line bg-white">
        <Container className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11.5px] text-muted">
            Typical equipment range{" "}
            <span className="font-semibold text-navy">
              {formatNaira(site.priceRange.min)} – {formatNaira(site.priceRange.max)}
            </span>
            . Individual prices are confirmed on request.
          </p>
          <p className="text-[11px] text-muted">
            {products.length} reference items · {categories.length} categories
          </p>
        </Container>
      </div>

      <section className="bg-ivory py-10 sm:py-14">
        <Container>
          <ProductFilters
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={(value) => updateParam("category", value)}
            condition={condition}
            onConditionChange={(value) => updateParam("condition", value)}
            counts={counts}
            resultCount={filtered.length}
            total={products.length}
            onReset={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <h2 className="sr-only">Catalogue results</h2>

          {filtered.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product, index) => (
                <Reveal key={product.id} delay={Math.min((index % 3) * 0.05, 0.1)} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center justify-center rounded-[18px] border border-dashed border-line-dark bg-white px-6 py-16 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-deep text-muted">
                <SearchX aria-hidden="true" className="h-5 w-5" />
              </span>
              <h2 className="mt-5 font-display text-[20px] font-semibold text-navy">
                No equipment matches that search.
              </h2>
              <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                Try a different term, or clear the filters to see the full catalogue. You can also
                ask us directly — we may be able to source the machine you need.
              </p>
              <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={resetFilters}
                  className={buttonStyles("primary", "md")}
                >
                  Clear search and filters
                </button>
                <a
                  href={whatsappLink(generalEnquiryMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonStyles("outline", "md")}
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col gap-4 rounded-[16px] border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="font-display text-[15px] font-semibold text-navy">
                Can&apos;t find the model you need?
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">
                Tell us the brand, model and quantity. We will confirm whether we can supply it.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-royal transition-colors hover:text-navy"
            >
              Send an enquiry
              <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Equipment enquiry"
        title="Need a price or availability check?"
        description="Send the machine name or model. We will confirm the current price, condition and availability for you."
      />
    </>
  );
}
