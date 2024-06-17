import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardWrapper from "../_components/DashboardWrapper";
import { getCompanyByUserId } from "@/database/actions/company.actions";
import { getPageViews } from "@/database/actions/pageview.actions";

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  const company: Company = await getCompanyByUserId(session?.user.id as string);

  // Retrieve and filter views from the last week
  const pageViews: number = await getPageViews(company.userId);

  return (
    <section>
      <DashboardWrapper company={company} pageViews={pageViews} />
    </section>
  );
};

export default page;
