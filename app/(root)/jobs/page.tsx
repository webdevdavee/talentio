import Jobs from "@/components/Jobs";
import SubHero from "@/components/SubHero";
import {
  getJobs,
  getJobsPropertyValueCount,
  getUniquePropertyValue,
} from "@/database/actions/job.actions";

export async function generateMetadata() {
  return {
    title: "Talentio - Find jobs",
    description: "Find jobs that suit your skills",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  page = !page || page < 1 ? 1 : page;

  const fetchedJobs: GetJob | undefined = await getJobs(page);

  // Create an array of promises
  const promises = [
    getJobsPropertyValueCount("type"),
    getJobsPropertyValueCount("category"),
    getJobsPropertyValueCount("level"),
    getJobsPropertyValueCount("salary"),
  ];

  // Using Promise.all to wait for all promises to resolve
  let [
    typeFrequency,
    categoryFrequency,
    levelFrequency,
    salaryFrequency,
  ]: JobsFilterFrequency[][] = await Promise.all(promises);

  const listOfLocationsFromJobs: SearchDataList[] =
    await getUniquePropertyValue("location");

  return (
    <section>
      <SubHero
        data={listOfLocationsFromJobs}
        title="Find your"
        breakTitle="dream job."
        subText="Find your next career at opportunities like Tesla, Apple and Microsoft"
        tagText=" Popular: Data Analyst, Sales Specialist, Product manager"
        placeholderText="job title or keyword"
        buttonText="Search my job"
        type="jobs"
      />
      <Jobs
        fetchedJobs={fetchedJobs}
        page={page}
        typeFrequency={typeFrequency}
        categoryFrequency={categoryFrequency}
        levelFrequency={levelFrequency}
        salaryFrequency={salaryFrequency}
      />
    </section>
  );
};

export default page;
