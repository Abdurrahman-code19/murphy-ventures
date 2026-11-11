import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import {
  availabilityLabels,
  categoryName,
  conditionLabels,
  priceLabel,
  productImageSrcSet,
} from "../../lib/products";
import { productEnquiryMessage, whatsappLink } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";
import { Badge } from "../shared/Badge";
import { WhatsAppIcon } from "../shared/WhatsAppIcon";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[16px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-line-dark hover:shadow-card">
      <Link
        to={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[4/3] overflow-hidden border-b border-line bg-ivory-deep"
      >
        <img
          src={product.images[0]}
          srcSet={productImageSrcSet(product.images[0])}
          sizes="(min-width: 1280px) 380px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 88vw"
          alt={product.imageAlt}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.045]"
        />
        <span className="absolute left-3 top-3">
          <Badge tone={product.condition === "fairly-used" ? "gold" : "outline"}>
            {conditionLabels[product.condition]}
          </Badge>
        </span>
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-navy opacity-0 shadow-sm backdrop-blur transition-all duration-300 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[9.5px] font-semibold uppercase tracking-[0.2em] text-muted">
          {categoryName(product.category)}
        </p>
        <h3 className="mt-2 font-display text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-navy">
          <Link to={`/products/${product.slug}`} className="transition-colors hover:text-royal">
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-muted">
          {product.summary}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-navy">{priceLabel(product)}</p>
            <p className="mt-0.5 truncate text-[10.5px] text-muted">
              {availabilityLabels[product.availability]}
            </p>
          </div>
          <a
            href={whatsappLink(productEnquiryMessage(product.name, product.model))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about the ${product.name} on WhatsApp`}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-dark text-navy transition-colors",
              "hover:border-gold hover:bg-gold/10",
            )}
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
