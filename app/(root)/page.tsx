import FeaturedCategories from "@/components/FeaturedCategories";
import CompaniesHelped from "@/components/CompaniesHelped";
import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeaturedJobs";
import SignUpBanner from "@/components/SignUpBanner";
import LatestJobs from "@/components/LatestJobs";

export default async function Home() {
  return (
    <section className="w-full">
      <Hero />
      <CompaniesHelped />
      <FeaturedCategories />
      <div className="px-16">
        <SignUpBanner />
      </div>
      <FeaturedJobs />
      <LatestJobs />
    </section>
  );
}
