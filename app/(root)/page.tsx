import FeaturedCategories from "@/components/FeaturedCategories";
import CompaniesHelped from "@/components/CompaniesHelped";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <section className="w-full">
      <Hero />
      <CompaniesHelped />
      <FeaturedCategories />
    </section>
  );
}
