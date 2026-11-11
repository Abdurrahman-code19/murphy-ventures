import { site } from "../config/site";
import { useSeo } from "../hooks/useSeo";
import { localBusinessSchema } from "../lib/schema";
import { AboutPreview } from "../components/home/AboutPreview";
import { CategoryGrid } from "../components/home/CategoryGrid";
import { ConditionShowcase } from "../components/home/ConditionShowcase";
import { ContactStrip } from "../components/home/ContactStrip";
import { CredibilityStrip } from "../components/home/CredibilityStrip";
import { FeaturedProducts } from "../components/home/FeaturedProducts";
import { Hero } from "../components/home/Hero";
import { ServicesOverview } from "../components/home/ServicesOverview";
import { WhyChoose } from "../components/home/WhyChoose";
import { CtaBand } from "../components/shared/CtaBand";

export default function Home() {
  useSeo({
    title: "Murphy Ventures — Banking & Office Equipment, Lagos",
    description: site.description,
    path: "/",
    jsonLd: localBusinessSchema(),
  });

  return (
    <>
      <Hero />
      <CredibilityStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <ConditionShowcase />
      <ServicesOverview />
      <WhyChoose />
      <AboutPreview />
      <CtaBand />
      <ContactStrip />
    </>
  );
}
