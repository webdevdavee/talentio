import { auth } from "@/auth";
import JobApplicationForm from "@/components/JobApplicationForm";
import { getJobById } from "@/database/actions/job.actions";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Talentio - Apply to job",
    description: "Send your application.",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let jobToApply = searchParams.job as string;

  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");
  const userId = session?.user.id;

  const job: Job = await getJobById(jobToApply);
  return (
    <section>
      <div className="w-full flex justify-center p-10">
        <JobApplicationForm job={job} userId={userId} />
      </div>
    </section>
  );
};

export default page;
