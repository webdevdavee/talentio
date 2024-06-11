import { auth } from "@/auth";
import ApplicationsWrapper from "@/components/dashboard/ApplicationsWrapper";
import { getUserApplications } from "@/database/actions/applications.actions";
import { getJobById } from "@/database/actions/job.actions";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Applications - ${session?.user.name}`,
    description: "Follow through with your job applications",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  let perPage = parseInt(searchParams.perPage as string, 10);
  page = !page || page < 1 ? 1 : page;
  perPage = !perPage || perPage < 1 ? 5 : perPage;

  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");

  // Fetch the user's applications
  const getApplications = await getUserApplications(
    session?.user.id,
    page,
    perPage
  );

  const totalPages = getApplications?.totalPages;

  // Fetch the full job details for each application
  const jobsDetails: Job[] = await Promise.all(
    getApplications?.applications.map(async (application: UserApplication) => {
      const job = await getJobById(application.jobId);
      return {
        ...job,
        applicationDate: application.createdAt, // Add the application date to the job object
      };
    })
  );

  return (
    <section className="px-8 flex flex-col gap-6">
      <ApplicationsWrapper
        jobsDetails={jobsDetails}
        page={page}
        totalPages={totalPages}
        perPage={perPage}
      />
    </section>
  );
};

export default page;
