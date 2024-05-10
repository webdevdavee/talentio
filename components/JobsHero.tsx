import SearchForm from "./SearchForm";

type JobsHeroProps = {
  listOfLocationsFromJobs: Locations[];
};

const JobsHero = ({ listOfLocationsFromJobs }: JobsHeroProps) => {
  return (
    <section className="relative w-full max-h-[37rem] py-20 px-16 flex items-center justify-center hero overflow-hidden">
      <div className="w-full flex flex-col items-center gap-12">
        <h1 className="text-6xl font-bold">
          Find your <span className="text-primary">dream job.</span>
        </h1>
        <p className="font-medium">
          Find your next career at opportunities like Tesla, Apple and Microsoft
        </p>
        <div>
          <SearchForm listOfLocationsFromJobs={listOfLocationsFromJobs} />
          <p className="mt-4 text-sm text-gray-500">
            Popular: Data Analyst, Sales Specialist, Product manager
          </p>
        </div>
      </div>
    </section>
  );
};

export default JobsHero;
