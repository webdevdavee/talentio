import Image from "next/image";
import { useState } from "react";

type ListInputType = {
  label: string;
  data: string[];
  setData: React.Dispatch<React.SetStateAction<string[]>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ListInput = ({
  label,
  data,
  setData,
  error,
  setError,
}: ListInputType) => {
  const [inputValue, setInputValue] = useState("");

  const addItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      // Add the input value to the items array
      if (inputValue.trim() !== "") {
        setData([...data, inputValue.trim()]);
        setInputValue("");
        setError?.("");
      }
    }
  };

  const removeItem = (indexToRemove: number) => {
    setData(data.filter((_, index) => index !== indexToRemove));
  };

  return (
    <section className="w-full mt-4">
      <label className="text-base font-light ">{label}</label>
      <div className="flex flex-wrap items-center justify-start gap-2 p-3 transition border-[1px] border-gray-400 w-full min-h-12 bg-white">
        <ul className="flex flex-wrap items-center justify-start gap-2">
          {data.map((d, index) => (
            <li
              key={`${d}-${index}`}
              className="bg-primary text-white text-sm rounded p-2 flex items-center justify-center gap-2"
            >
              {d}
              <button
                type="button"
                className="text-base"
                onClick={() => removeItem(index)}
              >
                <Image
                  src="/close.svg"
                  width={17}
                  height={17}
                  alt="remove-tag"
                />
              </button>
            </li>
          ))}
        </ul>

        <input
          type="text"
          className="outline-none border-0 bg-transparent font-openSans font-normal text-sm"
          placeholder="type and press enter..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => addItem(e)}
        />
      </div>
      <p className="text-red-500">{error}</p>
    </section>
  );
};

export default ListInput;
