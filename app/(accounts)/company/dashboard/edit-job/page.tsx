import { auth } from "@/auth";
import { redirect } from "next/navigation";
import PostJobForm from "../../_components/PostJobForm";
import { getCompanyByUserId } from "@/database/actions/company.actions";
import { getJobById } from "@/database/actions/job.actions";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Edit job - ${session?.user.name}`,
    description: "Edit a job",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  // Get job to edit from url key
  const jobToEdit = searchParams.job as string;
  const job = await getJobById(jobToEdit);

  if (!job) {
    redirect("/company/dashboard/job-list");
  }

  const session = await auth();
  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  const company = await getCompanyByUserId(session?.user.id as string);

  return (
    <section className="px-8">
      <PostJobForm type="edit" job={job} company={company} />
    </section>
  );
};

export default page;
