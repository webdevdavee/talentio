import JobDetails from "@/components/JobDetails";
import { getCompanyByName } from "@/database/actions/company.actions";
import { getJobById, getJobs } from "@/database/actions/job.actions";
import { Metadata } from "next";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const job = await getJobById(id);
  return {
    title: `${job.title} - Talentio`,
    description: job.description,
  };
}

const page = async ({ params: { id } }: Params) => {
  const job: Job = await getJobById(id);
  const company: Company[] = await getCompanyByName(job.company);
  return (
    <section className="px-16 my-8">
      <JobDetails job={job} company={company[0]} />
    </section>
  );
};

export async function generateStaticParams() {
  const fetchedJobs = await getJobs();
  let jobs = [];
  if (fetchedJobs && fetchedJobs.jobsNoLimit) {
    jobs = fetchedJobs.jobsNoLimit;
  }
  return jobs.map((job) => ({
    params: { id: job._id },
  }));
}

export default page;