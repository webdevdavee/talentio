import Jobs from "@/components/Jobs";
import JobsHero from "@/components/JobsHero";

export async function generateMetadata() {
  return {
    title: "Talentio - Find jobs",
    description: "Find jobs that suit your skills",
  };
}

const page = async ({ searchParams }: SearchParamProps) => {
  let page = parseInt(searchParams.page as string, 10);
  page = !page || page < 1 ? 1 : page;

  return (
    <section>
      <JobsHero />
      <Jobs page={page} />
    </section>
  );
};

export default page;
