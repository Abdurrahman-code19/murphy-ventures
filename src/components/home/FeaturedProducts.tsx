import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { featuredProducts } from "../../lib/products";
import { buttonStyles } from "../shared/Button";
import { Container } from "../shared/Container";
import { Reveal } from "../shared/Reveal";
import { SectionHeading } from "../shared/SectionHeading";
import { ProductCard } from "../products/ProductCard";

export function FeaturedProducts() {
  return (
    <section className="border-t border-line bg-white py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Featured equipment"
          title={
            <>
              Machines that keep
              <br />
              business moving.
            </>
          }
          description="A closer look at some of the banking and office equipment requested most often. Every listing is confirmed individually — from model and condition to price and availability."
          action={
            <Link to="/products" className={buttonStyles("outline", "md")}>
              All equipment
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.slice(0, 6).map((product, index) => (
            <Reveal key={product.id} delay={(index % 3) * 0.06} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-4 rounded-[14px] border border-line bg-ivory px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-relaxed text-muted">
            Looking for a specific brand, model or a fairly used option? Send us the details
            and we will confirm what is available.
          </p>
          <Link
            to="/products"
            className="inline-flex shrink-0 items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-royal transition-colors hover:text-navy"
          >
            Browse the catalogue
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
