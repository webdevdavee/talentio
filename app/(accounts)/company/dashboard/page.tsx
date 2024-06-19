import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardWrapper from "../_components/DashboardWrapper";
import { getCompanyByUserId } from "@/database/actions/company.actions";
import { getPageViews } from "@/database/actions/pageview.actions";
import { getNewCandidatesCount } from "@/database/actions/applications.actions";

export async function generateMetadata() {
  const session = await auth();

  return {
    title: `Dashboard - ${session?.user.name}`,
    description: "Follow through with your job listings",
  };
}

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  const company: Company = await getCompanyByUserId(session?.user.id as string);

  // Retrieve and filter views from the last week
  const pageViews: number = await getPageViews(company.userId);

  // Retrieve and filter new candidates by the company
  const newCandidatesCount: number | undefined = await getNewCandidatesCount(
    company.userId
  );

  return (
    <section>
      <DashboardWrapper
        company={company}
        pageViews={pageViews}
        newCandidatesCount={newCandidatesCount}
      />
    </section>
  );
};

export default page;
