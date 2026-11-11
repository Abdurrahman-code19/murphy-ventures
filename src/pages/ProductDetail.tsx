import { ArrowRight, Check, MessageSquare, Phone, ShieldCheck, Wrench } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { site } from "../config/site";
import { useSeo } from "../hooks/useSeo";
import {
  availabilityLabels,
  categoryName,
  conditionLabels,
  getProductBySlug,
  getRelatedProducts,
  priceLabel,
  productImageSrcSet,
} from "../lib/products";
import { breadcrumbSchema, productSchema } from "../lib/schema";
import { formatNaira } from "../lib/utils";
import { productEnquiryMessage, whatsappLink } from "../lib/whatsapp";
import { Badge } from "../components/shared/Badge";
import { Breadcrumbs } from "../components/shared/Breadcrumbs";
import { buttonStyles } from "../components/shared/Button";
import { Container } from "../components/shared/Container";
import { CtaBand } from "../components/shared/CtaBand";
import { ProductCard } from "../components/products/ProductCard";
import { WhatsAppIcon } from "../components/shared/WhatsAppIcon";
import NotFound from "./NotFound";

const steps = [
  "Send the product enquiry on WhatsApp or call the team.",
  "We confirm the exact model, condition, price and availability.",
  "You decide how to proceed — collection, delivery or a visit are discussed directly.",
];

export default function ProductDetail() {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;

  useSeo({
    title: product ? product.name : "Product not found",
    description: product
      ? `${product.summary} Enquire with Murphy Ventures for the current price, condition and availability.`
      : "This product could not be found in the Murphy Ventures catalogue.",
    path: product ? `/products/${product.slug}` : "/products",
    noIndex: !product,
    jsonLd: product
      ? [
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: product.name, path: `/products/${product.slug}` },
          ]),
        ]
      : undefined,
  });

  if (!product) {
    return <NotFound />;
  }

  const related = getRelatedProducts(product, 3);
  const enquiryHref = whatsappLink(productEnquiryMessage(product.name, product.model));
  const category = categoryName(product.category);

  return (
    <>
      <div className="border-b border-line bg-white">
        <Container className="py-4">
          <Breadcrumbs
            items={[
              { label: "Products", to: "/products" },
              { label: category, to: `/products?category=${product.category}` },
              { label: product.name },
            ]}
          />
        </Container>
      </div>

      <section className="bg-white py-10 sm:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div>
              <div className="relative overflow-hidden rounded-[20px] border border-line bg-ivory-deep">
                <div aria-hidden="true" className="absolute inset-0 bg-blueprint-light opacity-50" />
                <img
                  src={product.images[0]}
                  srcSet={productImageSrcSet(product.images[0])}
                  sizes="(min-width: 1024px) 620px, (min-width: 640px) 88vw, 100vw"
                  alt={product.imageAlt}
                  width={1200}
                  height={900}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="relative w-full"
                />
                <span className="absolute left-4 top-4">
                  <Badge tone={product.condition === "fairly-used" ? "gold" : "outline"}>
                    {conditionLabels[product.condition]}
                  </Badge>
                </span>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-muted">
                Product photo for reference. Ask us for current photos of the exact unit — finish,
                condition and included accessories can vary.
              </p>
            </div>

            <div>
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                {category}
              </p>
              <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.85rem)] font-semibold leading-[1.06] tracking-[-0.035em] text-navy">
                {product.name}
              </h1>
              <p className="mt-4 text-[14px] leading-relaxed text-muted">{product.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge tone="outline">{conditionLabels[product.condition]}</Badge>
                <Badge tone="neutral">{availabilityLabels[product.availability]}</Badge>
                {product.brand ? <Badge tone="neutral">{product.brand}</Badge> : null}
              </div>

              <div className="mt-6 rounded-[16px] border border-line bg-ivory p-5">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-muted">
                      Price
                    </p>
                    <p className="mt-1 font-display text-[24px] font-semibold tracking-[-0.02em] text-navy">
                      {priceLabel(product)}
                    </p>
                  </div>
                  <p className="max-w-[210px] text-[10.5px] leading-snug text-muted">
                    Confirmed for the exact model and condition. General range:{" "}
                    {formatNaira(site.priceRange.min)} – {formatNaira(site.priceRange.max)}.
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={enquiryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonStyles("gold", "md", "flex-1")}
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={`tel:${site.phones[0].tel}`}
                    className={buttonStyles("outline", "md", "flex-1")}
                  >
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    Call to confirm
                  </a>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5 text-[12.5px]">
                <div>
                  <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Category
                  </dt>
                  <dd className="mt-1 text-ink">{category}</dd>
                </div>
                <div>
                  <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Condition
                  </dt>
                  <dd className="mt-1 text-ink">{conditionLabels[product.condition]}</dd>
                </div>
                <div>
                  <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Brand
                  </dt>
                  <dd className="mt-1 text-ink">{product.brand ?? "Confirmed on enquiry"}</dd>
                </div>
                <div>
                  <dt className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Model
                  </dt>
                  <dd className="mt-1 text-ink">{product.model ?? "Confirmed on enquiry"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-ivory py-14 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
            <div>
              <h2 className="font-display text-[22px] font-semibold text-navy">
                About this equipment
              </h2>
              <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-muted">
                {product.description}
              </p>

              {product.specifications?.length ? (
                <div className="mt-7 overflow-hidden rounded-[14px] border border-line bg-white">
                  <table className="w-full text-left text-[12.5px]">
                    <caption className="sr-only">Confirmed specifications</caption>
                    <tbody>
                      {product.specifications.map((spec) => (
                        <tr key={spec.label} className="border-b border-line last:border-0">
                          <th
                            scope="row"
                            className="w-1/3 bg-ivory/60 px-4 py-3 font-semibold text-navy"
                          >
                            {spec.label}
                          </th>
                          <td className="px-4 py-3 text-ink">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-5 flex items-start gap-2.5 rounded-[12px] border border-line bg-white p-4 text-[12px] leading-relaxed text-muted">
                  <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-gold-ink" />
                  Full specifications for this machine are confirmed on enquiry. We do not publish
                  unverified details.
                </p>
              )}

              <p className="mt-5 text-[11.5px] leading-relaxed text-muted">
                Reference listing only. Model availability and condition can change — confirm with
                the team before travelling.
              </p>
            </div>

            <div className="rounded-[18px] border border-line bg-white p-6 sm:p-7">
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                What happens next
              </p>
              <ol className="mt-5 space-y-4">
                {steps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-semibold text-ivory">
                      {index + 1}
                    </span>
                    <p className="text-[12.5px] leading-relaxed text-ink">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 border-t border-line pt-5">
                <p className="flex items-center gap-2 text-[11.5px] text-muted">
                  <MessageSquare aria-hidden="true" className="h-4 w-4 text-gold-ink" />
                  Prefer to talk it through?
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  {site.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="text-[13px] font-medium text-navy transition-colors hover:text-royal"
                    >
                      {phone.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-white py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-ink">
                Related equipment
              </p>
              <h2 className="mt-3 font-display text-[26px] font-semibold tracking-[-0.03em] text-navy">
                You may also need
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-royal transition-colors hover:text-navy"
            >
              All equipment
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand
        eyebrow="Equipment enquiry"
        title={`Interested in the ${product.name}?`}
        description="Send an enquiry and we will confirm the current price, condition and availability. For repairs, our technical team can advise on the next step."
      />

      <div className="border-t border-line bg-white">
        <Container className="flex flex-col gap-3 py-5 text-[11.5px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2">
            <Wrench aria-hidden="true" className="h-3.5 w-3.5 text-gold-ink" />
            Murphy Ventures also repairs and maintains this equipment.
          </p>
          <Link
            to="/request-repair"
            className="inline-flex items-center gap-1.5 font-semibold uppercase tracking-[0.1em] text-royal hover:text-navy"
          >
            Request a repair
            <Check aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </Container>
      </div>
    </>
  );
}
