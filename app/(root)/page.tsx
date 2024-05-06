import FeaturedCategories from "@/components/FeaturedCategories";
import CompaniesHelped from "@/components/CompaniesHelped";
import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeaturedJobs";

export default function Home() {
  return (
    <section className="w-full">
      <Hero />
      <CompaniesHelped />
      <FeaturedCategories />
      <FeaturedJobs />
    </section>
  );
}
