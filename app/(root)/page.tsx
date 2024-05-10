import FeaturedCategories from "@/components/FeaturedCategories";
import CompaniesHelped from "@/components/CompaniesHelped";
import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeaturedJobs";
import SignUpBanner from "@/components/SignUpBanner";
import LatestJobs from "@/components/LatestJobs";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export default async function Home() {
  return (
    <Suspense fallback={<Loader className="loader" />}>
      <section className="w-full">
        <Hero />
        <CompaniesHelped />
        <FeaturedCategories />
        <SignUpBanner />
        <FeaturedJobs />
        <LatestJobs />
      </section>
    </Suspense>
  );
}
