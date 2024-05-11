"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSearchSchema, searchSchema } from "@/lib/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { createURL } from "@/lib/utils";
import SearchList from "./SearchList";
import SearchTitleInput from "./SearchTitleInput";
import SearchListInput from "./SearchListInput";

type SearchFormProps = {
  data: SearchDataList[];
  placeholderText: string;
  buttonText: string;
  type: string;
};

const SearchForm = ({
  data,
  placeholderText,
  buttonText,
  type,
}: SearchFormProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [keywordInputValue, setKeywordInputValue] = useState("");
  const [listInputValue, setListInputValue] = useState("Germany");
  const [showList, setShowList] = useState(false);

  const searchSearchParams = new URLSearchParams(searchParams.toString());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TSearchSchema>({ resolver: zodResolver(searchSchema) });

  const onSubmit = async (data: TSearchSchema) => {
    searchSearchParams.append("search", data.title);
    searchSearchParams.append("search", data.list);
    let url: string;
    if (type === "companies") {
      url = createURL("/companies", searchSearchParams);
    } else {
      url = createURL("/jobs", searchSearchParams);
    }
    router.push(url);
    reset();
  };

  // Create an array based on the search input and if no input, return the original array
  const filteredDataSearch = data?.filter((d) =>
    d.location.toLowerCase().includes(listInputValue.toLowerCase())
  );

  const handleListInput = (e: ChangeEvent<HTMLInputElement>) => {
    setShowList(true);
    const value = e.target.value;
    setListInputValue(value);
  };

  useEffect(() => {
    setValue("list", listInputValue);
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-fit p-4 flex items-center gap-4 drop-shadow"
    >
      <SearchTitleInput
        inputRegister={register("title")}
        error={
          errors.title && (
            <p className="text-red-500">{`${errors.title.message}`}</p>
          )
        }
        keywordInputValue={keywordInputValue}
        setKeywordInputValue={setKeywordInputValue}
        placeholderText={placeholderText}
      />
      <div className="relative">
        <SearchListInput
          inputRegister={register("list")}
          error={
            errors.list && (
              <p className="text-red-500">{`${errors.list.message}`}</p>
            )
          }
          handleListInput={handleListInput}
          listInputValue={listInputValue}
          showList={showList}
          setShowList={setShowList}
        />
        {showList && (
          <SearchList
            data={filteredDataSearch}
            setListInputValue={setListInputValue}
            setShowList={setShowList}
            setValue={setValue}
          />
        )}
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2">
        {buttonText}
      </button>
    </form>
  );
};

export default SearchForm;
