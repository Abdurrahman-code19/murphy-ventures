import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "../../data/categories";
import { categoryCount, productImageSrcSet } from "../../lib/products";
import type { Category } from "../../types";
import { cn } from "../../lib/utils";
import { buttonStyles } from "../shared/Button";
import { Container } from "../shared/Container";
import { SectionHeading } from "../shared/SectionHeading";
import { CategoryIcon } from "../products/CategoryIcon";

export function CategoryGrid() {
  const [feature, second, ...rest] = categories;
  const secondIndex = 2;

  return (
    <section className="relative bg-ivory py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Equipment catalogue"
          title={
            <>
              Five categories.
              <br />
              One dependable supplier.
            </>
          }
          description="From cash handling and time recording to security and office machines — explore the equipment Murphy Ventures supplies, with condition and pricing confirmed on enquiry."
          action={
            <Link to="/products" className={buttonStyles("outline", "md")}>
              View full catalogue
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-4 sm:mt-12 lg:grid-cols-12">
          <CategoryCard category={feature} index={1} feature className="lg:col-span-7" />

          <CategoryCard category={second} index={secondIndex} className="lg:col-span-5" />

          {rest.map((category, index) => (
            <CategoryCard
              key={category.slug}
              category={category}
              index={secondIndex + index + 1}
              className="lg:col-span-4"
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CategoryCard({
  category,
  index,
  feature = false,
  className,
}: {
  category: Category;
  index: number;
  feature?: boolean;
  className?: string;
}) {
  const count = categoryCount(category.slug);

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[18px] border p-6 transition-all duration-300 sm:p-7",
        feature
          ? "min-h-[320px] border-navy bg-navy text-ivory shadow-card lg:min-h-[360px]"
          : "min-h-[240px] border-line bg-white hover:-translate-y-1 hover:border-line-dark hover:shadow-card",
        className,
      )}
    >
      {feature ? (
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-blueprint opacity-70" />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full border border-gold/20"
          />
        </>
      ) : (
        <img
          src={category.image}
          alt=""
          aria-hidden="true"
          width={1200}
          height={900}
          loading="lazy"
          className="pointer-events-none absolute -bottom-4 -right-3 w-32 opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.12]"
        />
      )}

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.22em]",
            feature ? "text-gold-soft" : "text-muted",
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border",
            feature
              ? "border-white/15 bg-white/5 text-gold-soft"
              : "border-line bg-ivory text-gold-ink",
          )}
        >
          <CategoryIcon name={category.icon} className="h-4.5 w-4.5" />
        </span>
      </div>

      {feature ? (
        <div className="pointer-events-none absolute -right-8 bottom-4 hidden w-[48%] rotate-[-4deg] sm:block">
          <div className="rounded-[14px] border border-white/10 bg-white p-3 shadow-float transition-transform duration-500 group-hover:rotate-[-2deg] group-hover:scale-[1.02]">
            <img
              src={category.image}
              srcSet={productImageSrcSet(category.image)}
              sizes="(min-width: 1024px) 250px, 40vw"
              alt=""
              aria-hidden="true"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="w-full"
            />
          </div>
        </div>
      ) : null}

      <div className={cn("relative mt-10", feature && "max-w-[88%] sm:max-w-[54%]")}>
        <h3
          className={cn(
            "font-display text-[20px] font-semibold leading-snug tracking-[-0.02em]",
            feature ? "text-ivory" : "text-navy",
          )}
        >
          {category.name}
        </h3>
        <p
          className={cn(
            "mt-2 text-[12.5px] leading-relaxed",
            feature ? "text-white/55" : "text-muted",
          )}
        >
          {category.description}
        </p>
        <span
          className={cn(
            "mt-5 inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.14em]",
            feature ? "text-gold-soft" : "text-royal",
          )}
        >
          {count} {count === 1 ? "item" : "items"}
          <ArrowUpRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
      </div>
    </Link>
  );
}
