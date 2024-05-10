import CompanyCategory from "@/components/CompanyCategory";
import Loader from "@/components/Loader";
import RecommendedCompanies from "@/components/RecommendedCompanies";
import SignUpBanner from "@/components/SignUpBanner";
import SubHero from "@/components/SubHero";
import { getCategories } from "@/database/actions/category.actions";
import { getUniquePropertyValue } from "@/database/actions/job.actions";
import { Suspense } from "react";

export async function generateMetadata() {
  return {
    title: "Talentio - Find companies",
    description: "Find your dream company",
  };
}

const page = async () => {
  const listOfCompaniesFromJobs: SearchDataList[] =
    await getUniquePropertyValue("location");

  const categories: Category[] = await getCategories();

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen flex items-center justify-center">
          <Loader className="loader" />
        </div>
      }
    >
      <section>
        <SubHero
          data={listOfCompaniesFromJobs}
          title="Find your"
          breakTitle="dream companies"
          subText="Find the company you dream to work for"
          tagText="Popular: Tesla, Google, Samsung"
          placeholderText="company name"
          buttonText="Search"
        />
        <RecommendedCompanies />
        <div className="px-16">
          <SignUpBanner />
        </div>
        <CompanyCategory categories={categories} />
      </section>
    </Suspense>
  );
};

export default page;
