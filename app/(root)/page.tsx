import FeaturedCategories from "@/components/FeaturedCategories";
import CompaniesHelped from "@/components/CompaniesHelped";
import Hero from "@/components/Hero";
import FeaturedJobs from "@/components/FeaturedJobs";
import SignUpBanner from "@/components/SignUpBanner";
import LatestJobs from "@/components/LatestJobs";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");

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
