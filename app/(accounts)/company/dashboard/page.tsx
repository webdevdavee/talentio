import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardWrapper from "../_components/DashboardWrapper";

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  return (
    <section>
      <DashboardWrapper />
    </section>
  );
};

export default page;
