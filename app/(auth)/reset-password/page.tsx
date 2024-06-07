import { auth } from "@/auth";
import ResetPasswordWrapper from "@/components/ResetPasswordWrapper";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();

  if (session) redirect("/individual/dashboard");

  return (
    <section>
      <ResetPasswordWrapper />
    </section>
  );
};

export default page;
