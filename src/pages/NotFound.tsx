import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSeo } from "../hooks/useSeo";
import { buttonStyles } from "../components/shared/Button";
import { Container } from "../components/shared/Container";

export default function NotFound() {
  useSeo({
    title: "Page not found",
    description: "The page you are looking for could not be found on the Murphy Ventures website.",
    path: "/404",
    noIndex: true,
  });

  return (
    <section className="relative overflow-hidden bg-ivory">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint-light opacity-40" />
      <Container className="relative flex min-h-[65vh] flex-col justify-center py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-ink">
          Error 404
        </p>
        <h1 className="mt-5 max-w-2xl font-display text-[clamp(2.4rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-navy">
          That page isn&apos;t here.
        </h1>
        <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted">
          The address may have changed, or the link may be incomplete. You can head back to the
          homepage, browse our equipment, or contact the team directly.
        </p>
        <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
          <Link to="/" className={buttonStyles("primary", "md")}>
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            Back to homepage
          </Link>
          <Link to="/products" className={buttonStyles("outline", "md")}>
            Browse equipment
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
