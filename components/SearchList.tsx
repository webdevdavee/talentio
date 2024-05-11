import { Dispatch, MouseEvent, SetStateAction } from "react";
import { UseFormSetValue } from "react-hook-form";

type SearchListProps = {
  data: SearchDataList[];
  setListInputValue: Dispatch<SetStateAction<string>>;
  setShowList: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<{
    title: string;
    list?: string | undefined;
  }>;
};

const SearchList = ({
  data,
  setListInputValue,
  setShowList,
  setValue,
}: SearchListProps) => {
  // Select list from the listValue
  const selectList = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    const listValue = e.currentTarget.textContent;
    setListInputValue(listValue ?? "");
    setValue("list", listValue ?? "");
    setShowList(false);
  };

  return (
    <section className="flex flex-col max-h-[9rem] overflow-y-auto items-start p-1 mt-2 absolute w-full border-[1px] border-gray-300 bg-white drop-shadow custom-scrollbar">
      {data.length > 0 ? (
        data.map((key, i) => (
          <button
            key={i}
            type="button"
            className="w-full text-left text-sm hover:bg-gray-100 transition p-3"
            onClick={(e) => selectList(e)}
          >
            {key.location}
          </button>
        ))
      ) : (
        <p className="text-sm text-center">No results</p>
      )}
    </section>
  );
};

export default SearchList;
