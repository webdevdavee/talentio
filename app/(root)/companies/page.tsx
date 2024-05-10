import SubHero from "@/components/SubHero";
import { getUniquePropertyValue } from "@/database/actions/job.actions";

const page = async () => {
  const listOfCompaniesFromJobs: SearchDataList[] =
    await getUniquePropertyValue("location");

  return (
    <section>
      <SubHero
        data={listOfCompaniesFromJobs}
        title="Find you"
        breakTitle="dream companies"
        subText="Find the company you dream to work for"
        tagText="Popular: Tesla, Google, Samsung"
        placeholderText="company name"
        buttonText="Search"
      />
    </section>
  );
};

export default page;
