import SearchForm from "./SearchForm";

type SubHeroProps = {
  data: SearchDataList[];
  title: string;
  breakTitle: string;
  subText: string;
  tagText: string;
  placeholderText: string;
  buttonText: string;
};

const SubHero = ({
  data,
  title,
  breakTitle,
  subText,
  tagText,
  placeholderText,
  buttonText,
}: SubHeroProps) => {
  return (
    <section className="relative w-full max-h-[37rem] py-20 px-16 flex items-center justify-center hero overflow-hidden">
      <div className="w-full flex flex-col items-center gap-12">
        <h1 className="text-6xl font-bold">
          {title} <span className="text-primary">{breakTitle}</span>
        </h1>
        <p className="font-medium">{subText}</p>
        <div>
          <SearchForm
            data={data}
            placeholderText={placeholderText}
            buttonText={buttonText}
          />
          <p className="mt-4 text-sm text-gray-500">{tagText}</p>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
