import { auth } from "@/auth";
import SavedJobsWrapper from "@/components/dashboard/SavedJobsWrapper";
import { getJobById } from "@/database/actions/job.actions";
import { getUserSavedJobs } from "@/database/actions/savedjobs.actions";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Saved jobs - ${session?.user.name}`,
    description: "Have a look at your saved jobs",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  let perPage = parseInt(searchParams.perPage as string, 10);
  page = !page || page < 1 ? 1 : page;
  perPage = !perPage || perPage < 1 ? 10 : perPage;

  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");

  // Fetch the user's saved jobs
  const getSavedJobs = await getUserSavedJobs(session?.user.id, page, perPage);

  const totalPages = getSavedJobs?.totalPages;

  // Fetch the full job details for each saved job
  const jobsDetails: Job[] = await Promise.all(
    getSavedJobs?.jobs.map((job: UserSavedJobs) => getJobById(job.jobId))
  );

  return (
    <section className="px-8 flex flex-col gap-6">
      <SavedJobsWrapper
        jobsDetails={jobsDetails}
        page={page}
        totalPages={totalPages}
        perPage={perPage}
      />
    </section>
  );
};

export default page;
