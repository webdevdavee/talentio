import { auth } from "@/auth";
import SecurityQuestionsForm from "@/components/SecurityQuestionsForm";
import { findByEmail } from "@/database/actions/user.action";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  const user: User = await findByEmail(session?.user.email as string);

  if (session?.user.provider !== "credentials" || user.securityQuestion)
    redirect("/individual/dashboard");

  return (
    <section>
      <SecurityQuestionsForm userId={session?.user.id} />
    </section>
  );
};

export default page;
