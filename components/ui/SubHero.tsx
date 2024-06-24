import SearchForm from "../forms/SearchForm";

type SubHeroProps = {
  data: SearchDataList[];
  title: string;
  breakTitle: string;
  subText: string;
  tagText: string;
  placeholderText: string;
  buttonText: string;
  type: string;
};

const SubHero = ({
  data,
  title,
  breakTitle,
  subText,
  tagText,
  placeholderText,
  buttonText,
  type,
}: SubHeroProps) => {
  return (
    <section className="relative w-full max-h-[37rem] py-20 px-16 flex items-center justify-center hero overflow-hidden m:px-4 m:py-8">
      <div className="w-full flex flex-col items-center gap-12 m:gap-6">
        <h1 className="text-6xl font-bold m:text-5xl m:text-center xl:text-center">
          {title} <span className="text-primary">{breakTitle}</span>
        </h1>
        <p className="font-medium m:text-sm m:text-center xl:text-center">
          {subText}
        </p>
        <div className="m:w-full">
          <SearchForm
            data={data}
            placeholderText={placeholderText}
            buttonText={buttonText}
            type={type}
          />
          <p className="mt-4 text-sm text-gray-500 m:text-xs">{tagText}</p>
        </div>
      </div>
    </section>
  );
};

export default SubHero;
