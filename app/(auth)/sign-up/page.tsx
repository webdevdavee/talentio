import AuthSignUpForm from "@/components/AuthSignUpForm";

export async function generateMetadata() {
  return {
    title: "Sign Up - Talentio",
    description: "Register on Talentio",
  };
}

const page = () => {
  return (
    <section>
      <AuthSignUpForm />
    </section>
  );
};

export default page;
