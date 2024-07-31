import {
  getCompanies,
  getCompanyById,
} from "@/database/actions/company.actions";
import { Metadata } from "next";
import CompanyDetails from "@/components/others/CompanyDetails";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { incrementPageView } from "@/database/actions/pageview.actions";

type Params = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Params): Promise<Metadata> {
  const company = await getCompanyById(id);
  return {
    title: `${company.company} - Talentio`,
    description: company.about,
  };
}

const page = async ({ params: { id } }: Params) => {
  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");
  const company: Company = await getCompanyById(id);

  // Increment company's page view count
  await incrementPageView(company.userId);

  return (
    <section className="px-16 my-8 m:px-4">
      <CompanyDetails company={company} />
    </section>
  );
};

export async function generateStaticParams() {
  const fetchedCompanies = await getCompanies();
  let companies = [];
  companies = fetchedCompanies?.companiesNoLimit ?? [];
  return companies.map((company: Company) => ({
    id: company._id,
  }));
}

export default page;
