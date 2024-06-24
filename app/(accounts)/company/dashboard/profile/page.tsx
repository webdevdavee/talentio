import { auth } from "@/auth";
import { getCompanyByUserId } from "@/database/actions/company.actions";
import { redirect } from "next/navigation";
import SettingsForm from "../../_components/SettingsForm";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Profile - ${session?.user.name}`,
    description: "Make changes to your account",
  };
}

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  const company = await getCompanyByUserId(session?.user.id as string);

  return (
    <section className="px-8 mb-10 m:px-4 m:mt-4 xl:px-4">
      <div className="border-b border-b-gray-200 pb-4 m:w-full">
        <h1 className="text-2xl font-medium">Profile</h1>
        <p className="text-sm">Manage your profile settings</p>
      </div>
      <div className="mt-5 m:w-full xl:w-full">
        <SettingsForm company={company} />
      </div>
    </section>
  );
};

export default page;
