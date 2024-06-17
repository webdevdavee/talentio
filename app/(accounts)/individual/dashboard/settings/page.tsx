import { auth } from "@/auth";
import SettingsForm from "@/components/dashboard/SettingsForm";
import { findIndividualById } from "@/database/actions/individual.action";
import { redirect } from "next/navigation";
import ApplicationDetailsForm from "../../_components/ApplicationDetailsForm";
import { findApplicationDetails } from "@/database/actions/applicationdetails.actions";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Settings - ${session?.user.name}`,
    description: "Have a look at your saved jobs",
  };
}

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");

  const user = await findIndividualById(session?.user.id as string);
  const applicationDetails = await findApplicationDetails(user.userId);

  return (
    <section className="px-8 mb-6">
      <div className="border-b border-b-gray-200 pb-4">
        <h1 className="text-2xl font-medium">Profile</h1>
        <p className="text-sm">Manage your profile settings</p>
      </div>
      <div className="flex gap-24 mt-5">
        <SettingsForm user={user} />
        <ApplicationDetailsForm
          user={user}
          applicationDetails={applicationDetails}
        />
      </div>
    </section>
  );
};

export default page;
