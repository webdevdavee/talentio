import SearchForm from "../SearchForm";

type DashboardCompaniesHeroProps = {
  data: SearchDataList[];
  title: string;
  breakTitle: string;
  subText: string;
  tagText: string;
  placeholderText: string;
  buttonText: string;
  type: string;
};

const DashboardCompaniesHero = ({
  data,
  tagText,
  placeholderText,
  buttonText,
  type,
}: DashboardCompaniesHeroProps) => {
  return (
    <section className="relative w-full max-h-[37rem] py-20 px-16 flex items-center justify-center hero overflow-hidden">
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

export default DashboardCompaniesHero;
