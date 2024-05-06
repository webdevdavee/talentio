import Image from "next/image";
import Link from "next/link";
import JobList from "./JobList";
import { getJobs } from "@/database/actions/job.actions";

const FeaturedJobs = async () => {
  const jobs: Job[] | undefined = await getJobs();

  return (
    <section className="w-full px-16 mt-16">
      <div className="flex items-center justify-between gap-3 mb-10">
        <h1 className="text-3xl font-bold">
          Featured <span className="text-primary">Jobs</span>
        </h1>
        <Link
          href="/jobs"
          className="flex items-center gap-2 text-primary font-semibold"
        >
          <p>Show all jobs</p>
          <Image src="/arrow-right.svg" width={25} height={25} alt="arrow" />
        </Link>
      </div>
      <JobList type="featured" jobs={jobs} />
    </section>
  );
};

export default FeaturedJobs;
