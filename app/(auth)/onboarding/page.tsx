import Onboarding from "@/components/Onboarding";

export async function generateMetadata() {
  return {
    title: "Onboarding - Talentio",
    description: "Welcome to Talentio",
  };
}

const page = () => {
  return (
    <section>
      <Onboarding />
    </section>
  );
};

export default page;
