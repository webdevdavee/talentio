import { auth } from "@/auth";
import ApplicationsWrapper from "@/app/(accounts)/individual/_components/ApplicationsWrapper";
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
  perPage = !perPage || perPage < 1 ? 10 : perPage;

  const session = await auth();
  if (!session) redirect("/sign-in");
  if (session?.user.accountType === "company") redirect("/company/dashboard");

  return (
    <section className="px-8 flex flex-col gap-6 m:px-4 xl:px-4">
      <ApplicationsWrapper
        userId={session?.user.id}
        page={page}
        perPage={perPage}
      />
    </section>
  );
};

export default page;
