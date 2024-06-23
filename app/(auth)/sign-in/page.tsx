import AuthSignInForm from "@/components/authentication/AuthSignInForm";

export async function generateMetadata() {
  return {
    title: "Sign In - Talentio",
    description: "Sign into Talentio",
  };
}

const page = () => {
  return (
    <section>
      <AuthSignInForm />
    </section>
  );
};

export default page;
