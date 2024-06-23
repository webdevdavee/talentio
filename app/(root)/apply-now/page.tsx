import { auth } from "@/auth";
import JobApplicationForm from "@/components/forms/JobApplicationForm";
import { findApplicationDetails } from "@/database/actions/applicationdetails.actions";
import { findIndividualById } from "@/database/actions/individual.action";
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

  const user = await findIndividualById(session?.user.id as string);
  const applicationDetails = await findApplicationDetails(user.userId);
  return (
    <section>
      <div className="w-full flex justify-center p-10 m:p-4">
        <JobApplicationForm
          job={job}
          userId={userId}
          applicationDetails={applicationDetails}
        />
      </div>
    </section>
  );
};

export default page;
