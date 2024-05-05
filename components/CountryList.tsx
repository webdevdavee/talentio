import { Dispatch, MouseEvent, SetStateAction } from "react";

type CountryListProps = {
  countries: Country[];
  setCountryInputValue: Dispatch<SetStateAction<string>>;
  setShowCountryList: Dispatch<SetStateAction<boolean>>;
};

const CountryList = ({
  countries,
  setCountryInputValue,
  setShowCountryList,
}: CountryListProps) => {
  // Select country from the list
  const selectCountry = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const country = e.currentTarget.textContent;
    setCountryInputValue(country ?? "");
    setShowCountryList(false);
  };

  return (
    <section className="flex flex-col max-h-[9rem] overflow-y-auto items-start p-1 mt-2 absolute w-full border-[1px] border-gray-300 bg-white drop-shadow custom-scrollbar">
      {countries.length > 0 ? (
        countries.map((country) => (
          <button
            key={country.id}
            type="button"
            className="w-full text-left text-sm hover:bg-gray-100 transition p-3"
            onClick={(e) => selectCountry(e)}
          >
            {country.name}
          </button>
        ))
      ) : (
        <p className="text-sm text-center">No results</p>
      )}
    </section>
  );
};

export default CountryList;
