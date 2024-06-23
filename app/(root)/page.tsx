import FeaturedCategories from "@/components/others/FeaturedCategories";
import CompaniesHelped from "@/components/others/CompaniesHelped";
import Hero from "@/components/ui/Hero";
import FeaturedJobs from "@/components/others/FeaturedJobs";
import SignUpBanner from "@/components/ui/SignUpBanner";
import LatestJobs from "@/components/others/LatestJobs";
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
      {!session && (
        <div className="px-16 m:px-4">
          <SignUpBanner />
        </div>
      )}
      <FeaturedJobs />
      <LatestJobs />
    </section>
  );
}
