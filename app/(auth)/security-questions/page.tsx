import { auth } from "@/auth";
import SecurityQuestionsForm from "@/components/SecurityQuestionsForm";
import { findByEmail } from "@/database/actions/users.actions";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  const user: AllUsers = await findByEmail(session?.user.email as string);

  if (session?.user.provider !== "credentials" || user.securityQuestion)
    redirect("/individual/dashboard");

  return (
    <section>
      <SecurityQuestionsForm
        email={session?.user.email}
        accountType={session.user.accountType}
      />
    </section>
  );
};

export default page;
