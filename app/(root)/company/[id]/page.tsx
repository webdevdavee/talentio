import {
  getCompanies,
  getCompanyById,
} from "@/database/actions/company.actions";
import { Metadata } from "next";

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
    title: company.company,
    description: company.about,
  };
}

const page = async ({ params: { id } }: Params) => {
  const company = await getCompanyById(id);
  return <section>page</section>;
};

export async function generateStaticParams() {
  const fetchedCompanies = await getCompanies();
  let companies = [];
  if (fetchedCompanies && fetchedCompanies.companiesNoLimit) {
    companies = fetchedCompanies.companiesNoLimit;
  }
  return companies.map((company) => ({
    params: { id: company._id },
  }));
}

export default page;
