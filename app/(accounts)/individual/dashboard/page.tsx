import { auth } from "@/auth";
import ApplicationsTable from "@/components/dashboard/ApplicationsTable";
import TableUtitlity from "@/components/dashboard/TableUtitlity";
import { redirect } from "next/navigation";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Applications - ${session?.user.name}`,
    description: "Follow through with your job applications",
  };
}

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");

  return (
    <section className="px-8 flex flex-col gap-6">
      <TableUtitlity />
      <ApplicationsTable />
    </section>
  );
};

export default page;
