import { auth } from "@/auth";
import SettingsForm from "@/components/dashboard/SettingsForm";
import { findIndividualById } from "@/database/actions/individual.action";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");

  const user = await findIndividualById(session?.user.id as string);

  return (
    <section className="px-8">
      <div className="border-b border-b-gray-200 pb-4">
        <h1 className="text-2xl font-medium">Profile</h1>
        <p className="text-sm">Manage your profile settings</p>
      </div>
      <SettingsForm user={user} />
    </section>
  );
};

export default page;
