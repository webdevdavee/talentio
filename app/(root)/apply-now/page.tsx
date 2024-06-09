import { auth } from "@/auth";
import JobApplicationForm from "@/components/JobApplicationForm";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session?.user.accountType === "company") redirect("/company/dashboard");
  return (
    <section>
      <div className="m-10">
        <JobApplicationForm />
      </div>
    </section>
  );
};

export default page;
