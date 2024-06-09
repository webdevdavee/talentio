import SearchForm from "../SearchForm";

type DashboardJobsHeroProps = {
  data: SearchDataList[];
  title: string;
  breakTitle: string;
  subText: string;
  tagText: string;
  placeholderText: string;
  buttonText: string;
  type: string;
};

const DashboardJobsHero = ({
  data,
  tagText,
  placeholderText,
  buttonText,
  type,
}: DashboardJobsHeroProps) => {
  return (
    <section className="relative w-full hero max-h-[37rem] py-20 px-16 flex items-center justify-center overflow-hidden">
      <div className="w-full flex flex-col items-center gap-12">
        <div>
          <SearchForm
            data={data}
            placeholderText={placeholderText}
            buttonText={buttonText}
            type={type}
          />
          <p className="mt-4 text-sm text-gray-500">{tagText}</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardJobsHero;
