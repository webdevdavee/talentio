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
    // <Suspense
    //   fallback={
    //     <div className="w-full h-screen flex items-center justify-center">
    //       <Loader className="loader" />
    //     </div>
    //   }
    // >
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
    // </Suspense>
  );
}
