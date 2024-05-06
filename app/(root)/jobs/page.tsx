import JobsFilterSidebar from "@/components/JobsFilterSidebar";
import JobsFromFilter from "@/components/JobsFromFilter";
import JobsHero from "@/components/JobsHero";
import { getJobs } from "@/database/actions/job.actions";

export async function generateMetadata() {
  return {
    title: "Talentio - Find jobs",
    description: "Find jobs that suit your skills",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  page = !page || page < 1 ? 1 : page;

  const jobs: Job[] | undefined = await getJobs(page);

  return (
    <section>
      <JobsHero />
      <div className="w-full flex items-start justify-start gap-8 p-16">
        <JobsFilterSidebar />
        <JobsFromFilter jobs={jobs} page={page} />
      </div>
    </section>
  );
};

export default page;
