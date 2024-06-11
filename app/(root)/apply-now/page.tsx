import { auth } from "@/auth";
import JobApplicationForm from "@/components/JobApplicationForm";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  return {
    title: "Talentio - Apply to job",
    description: "Send your application.",
  };
}

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");
  return (
    <section>
      <div className="w-full flex justify-center p-10">
        <JobApplicationForm />
      </div>
    </section>
  );
};

export default page;
