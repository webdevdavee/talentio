import { auth } from "@/auth";
import Companies from "@/components/others/Companies";
import SubHero from "@/components/ui/SubHero";
import {
  getCompanies,
  getArrayPropertyValuesFrequency,
} from "@/database/actions/company.actions";
import { getUniquePropertyValue } from "@/database/actions/job.actions";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Talentio - Find companies",
    description: "Find your dream company",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  page = !page || page < 1 ? 1 : page;

  const companies: GetCompanies | undefined = await getCompanies(page);

  // Create an array of promises
  const industryFrequency = await getArrayPropertyValuesFrequency("industry");

  const listOfCompaniesFromJobs: SearchDataList[] =
    await getUniquePropertyValue("location");

  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");

  return (
    <section>
      <SubHero
        data={listOfCompaniesFromJobs}
        title="Find your"
        breakTitle="dream companies"
        subText="Find the company you dream to work for"
        tagText="Popular: Tesla, Google, Samsung"
        placeholderText="company name"
        buttonText="Search"
        type="companies"
      />
      <Companies
        companies={companies}
        page={page}
        industryFrequency={industryFrequency}
      />
    </section>
  );
};

export default page;
