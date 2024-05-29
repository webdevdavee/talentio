import Auth from "@/components/Auth";

export async function generateMetadata() {
  return {
    title: "Sign Up - Talentio",
    description: "Register on Talentio",
  };
}

const page = () => {
  return (
    <section>
      <Auth type="signup" />
    </section>
  );
};

export default page;
