import SearchForm from "./SearchForm";
import HeroTitle from "./HeroTitle";
import Image from "next/image";
import { getUniquePropertyValue } from "@/database/actions/job.actions";

const Hero = async () => {
  const listOfLocationsFromJobs = await getUniquePropertyValue("location");

  return (
    <section className="relative flex items-start w-full max-h-[37rem] py-20 px-16 hero overflow-hidden">
      <div className="w-[60%] flex flex-col gap-8 items-start">
        <HeroTitle />
        <SearchForm
          data={listOfLocationsFromJobs}
          placeholderText="job title or keyword"
          buttonText="Search my job"
          type="jobs"
        />
        <p className="text-sm text-gray-500">
          Popular: Data Analyst, Sales Specialist, Product manager
        </p>
      </div>
      <div className="relative w-[40%] flex items-center justify-center">
        <Image
          src="/images/hero-man.webp"
          width={370}
          height={370}
          quality={100}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
