import Jobs from "@/components/Jobs";
import JobsHero from "@/components/JobsHero";
import { getJobs, getJobsWithFrequency } from "@/database/actions/job.actions";

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
    getJobsWithFrequency("type"),
    getJobsWithFrequency("category.name"),
    getJobsWithFrequency("level"),
    getJobsWithFrequency("salary"),
  ];

  // Using Promise.all to wait for all promises to resolve
  const [
    typeFrequency,
    categoryFrequency,
    levelFrequency,
    salaryFrequency,
  ]: JobsFilterFrequency[][] = await Promise.all(promises);

  return (
    <section>
      <JobsHero />
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
