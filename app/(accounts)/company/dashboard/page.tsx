import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardWrapper from "../_components/DashboardWrapper";
import { getCompanyByUserId } from "@/database/actions/company.actions";
import { getPageViews } from "@/database/actions/pageview.actions";
import { getNewCandidatesCount } from "@/database/actions/applications.actions";
import {
  getEachMonthViewsCount,
  getJobViews,
} from "@/database/actions/jobview.action";
import {
  getCompanyJobsAppliedCount,
  getJobsCountByCompanyId,
} from "@/database/actions/job.actions";

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

  // Retrieve and filter page views from the last week
  const pageViews: number = await getPageViews(company.userId);

  // Retrieve and filter job views from the last week
  const jobViews = await getJobViews(company.userId);

  // Retrieve company job count
  const companyJobCount = await getJobsCountByCompanyId(company.userId);

  // Retrieve company applied job count
  const companyAppliedCount = await getCompanyJobsAppliedCount(company.userId);

  // Retrieve and filter new candidates by the company
  const newCandidatesCount: number | undefined = await getNewCandidatesCount(
    company.userId
  );

  await getEachMonthViewsCount(company.userId);

  return (
    <section>
      <DashboardWrapper
        company={company}
        pageViews={pageViews}
        newCandidatesCount={newCandidatesCount}
        jobViews={jobViews?.thisWeekViews}
        jobViewsPercentageChange={jobViews?.percentageChange}
        companyJobCount={companyJobCount}
        companyAppliedCount={companyAppliedCount?.totalAppliedThisWeek}
        companyAppliedCountPercentage={companyAppliedCount?.percentageChange}
      />
    </section>
  );
};

export default page;
