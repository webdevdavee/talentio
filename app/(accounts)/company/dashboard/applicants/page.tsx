import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ApplicantsWrapper from "../../_components/ApplicantsWrapper";
import { getCompanyByUserId } from "@/database/actions/company.actions";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Applicants - ${session?.user.name}`,
    description: "Follow through with your job applicants",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  let perPage = parseInt(searchParams.perPage as string, 10);
  page = !page || page < 1 ? 1 : page;
  perPage = !perPage || perPage < 1 ? 10 : perPage;

  const session = await auth();
  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  const company: Company = await getCompanyByUserId(session?.user.id as string);

  return (
    <section className="px-8">
      <ApplicantsWrapper company={company} page={page} perPage={perPage} />
    </section>
  );
};

export default page;
