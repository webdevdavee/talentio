import { Dispatch, MouseEvent, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

type LocationListProps = {
  locations: Locations[];
  setCountryInputValue: Dispatch<SetStateAction<string>>;
  setShowCountryList: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<{
    title: string;
    location: string;
  }>;
};

const LocationList = ({
  locations,
  setCountryInputValue,
  setShowCountryList,
  setValue,
}: LocationListProps) => {
  // Select location from the list
  const selectLocation = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const location = e.currentTarget.textContent;
    setCountryInputValue(location ?? "");
    setValue("location", location ?? "");
    setShowCountryList(false);
  };

  return (
    <section className="flex flex-col max-h-[9rem] overflow-y-auto items-start p-1 mt-2 absolute w-full border-[1px] border-gray-300 bg-white drop-shadow custom-scrollbar">
      {locations.length > 0 ? (
        locations.map((location, i) => (
          <button
            key={i}
            type="button"
            className="w-full text-left text-sm hover:bg-gray-100 transition p-3"
            onClick={(e) => selectLocation(e)}
          >
            {location.location}
          </button>
        ))
      ) : (
        <p className="text-sm text-center">No results</p>
      )}
    </section>
  );
};

export default LocationList;
