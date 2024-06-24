import Image from "next/image";
import Link from "next/link";
import JobList from "./JobList";
import { getJobs } from "@/database/actions/job.actions";

const FeaturedJobs = async () => {
  const jobs: GetJob | undefined = await getJobs();

  return (
    <section className="w-full px-16 mt-16 m:px-4">
      <div className="flex items-center justify-between gap-3 mb-10">
        <h1 className="text-3xl font-bold m:text-2xl">
          Featured <span className="text-primary">Jobs</span>
        </h1>
        <Link
          href="/jobs"
          className="flex items-center gap-2 text-primary font-semibold m:hidden"
        >
          <p>Show all jobs</p>
          <Image src="/arrow-right.svg" width={25} height={25} alt="arrow" />
        </Link>
      </div>
      <JobList type="featured" jobs={jobs?.jobs} />
      <Link
        href="/jobs"
        className="flex items-center gap-2 text-primary font-semibold m:mt-4 xl:hidden xxl:hidden xxxl:hidden ultra:hidden"
      >
        <p>Show all jobs</p>
        <Image src="/arrow-right.svg" width={25} height={25} alt="arrow" />
      </Link>
    </section>
  );
};

export default FeaturedJobs;
