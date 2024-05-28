import Companies from "@/components/Companies";
import SubHero from "@/components/SubHero";
import {
  getCompanies,
  getArrayPropertyValuesFrequency,
} from "@/database/actions/company.actions";
import { getIndustries } from "@/database/actions/industry.actions";
import { getUniquePropertyValue } from "@/database/actions/job.actions";

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
  const industries: Industry[] = await getIndustries();

  // Create an array of promises
  const industryFrequency = await getArrayPropertyValuesFrequency("industry");

  const listOfCompaniesFromJobs: SearchDataList[] =
    await getUniquePropertyValue("location");

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
        industries={industries}
        page={page}
        industryFrequency={industryFrequency}
      />
    </section>
  );
};

export default page;
