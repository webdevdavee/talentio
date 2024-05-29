import Auth from "@/components/Auth";

export async function generateMetadata() {
  return {
    title: "Sign In - Talentio",
    description: "Sign into Talentio",
  };
}

const page = () => {
  return (
    <section>
      <Auth type="signin" />
    </section>
  );
};

export default page;
