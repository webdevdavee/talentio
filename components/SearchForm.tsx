"use client";

import CountryList from "./CountryList";
import { ChangeEvent, useState } from "react";
import countries from "@/constants/countries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSearchJobSchema, searchJobSchema } from "@/lib/zod";
import JobTitleInput from "./JobTitleInput";
import JobLocationInput from "./JobLocationInput";

const SearchForm = () => {
  const [jobInputValue, setJobInputValue] = useState("");
  const [countryInputValue, setCountryInputValue] = useState("Germany");
  const [showCountryList, setShowCountryList] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSearchJobSchema>({ resolver: zodResolver(searchJobSchema) });

  const onSubmit = async (data: TSearchJobSchema) => {
    reset();
  };

  // Create an array based on the search input and if no input, return the original array
  const filteredCountriesSearch = countries?.filter((country) =>
    country.name.toLowerCase().includes(countryInputValue.toLowerCase())
  );

  const handleCountryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setShowCountryList(true);
    const value = e.target.value;
    setCountryInputValue(value);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white w-fit p-4 flex items-center gap-4 drop-shadow"
    >
      <JobTitleInput
        inputRegister={register("title")}
        error={
          errors.title && (
            <p className="text-red-500">{`${errors.title.message}`}</p>
          )
        }
        jobInputValue={jobInputValue}
        setJobInputValue={setJobInputValue}
      />
      <div className="relative">
        <JobLocationInput
          inputRegister={register("location")}
          error={
            errors.location && (
              <p className="text-red-500">{`${errors.location.message}`}</p>
            )
          }
          handleCountryInput={handleCountryInput}
          countryInputValue={countryInputValue}
          showCountryList={showCountryList}
          setShowCountryList={setShowCountryList}
        />
        {showCountryList && (
          <CountryList
            countries={filteredCountriesSearch}
            setCountryInputValue={setCountryInputValue}
            setShowCountryList={setShowCountryList}
          />
        )}
      </div>
      <button type="submit" className="bg-primary text-white px-4 py-2">
        Search my job
      </button>
    </form>
  );
};

export default SearchForm;
