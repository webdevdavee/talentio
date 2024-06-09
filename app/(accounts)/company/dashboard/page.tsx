import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await auth();

  if (session?.user.accountType === "individual")
    redirect("/individual/dashboard");

  return <section>{JSON.stringify(session)}</section>;
};

export default page;
