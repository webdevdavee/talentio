import CompanySignUpForm from "@/components/forms/CompanySignUpForm";

export async function generateMetadata() {
  return {
    title: "Sign Up - Talentio",
    description: "Register on Talentio",
  };
}

const page = () => {
  return (
    <section>
      <div>
        <CompanySignUpForm />
      </div>
    </section>
  );
};

export default page;
