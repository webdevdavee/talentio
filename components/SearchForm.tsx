"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSearchJobSchema, searchJobSchema } from "@/lib/zod";
import JobTitleInput from "./JobTitleInput";
import JobLocationInput from "./JobLocationInput";
import LocationList from "./LocationList";
import { useRouter, useSearchParams } from "next/navigation";
import { createURL } from "@/lib/utils";

type SearchFormProps = {
  listOfLocationsFromJobs: Locations[];
};

const SearchForm = ({ listOfLocationsFromJobs }: SearchFormProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobInputValue, setJobInputValue] = useState("");
  const [countryInputValue, setCountryInputValue] = useState("Germany");
  const [showCountryList, setShowCountryList] = useState(false);

  const jobsSearchParams = new URLSearchParams(searchParams.toString());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TSearchJobSchema>({ resolver: zodResolver(searchJobSchema) });

  const onSubmit = async (data: TSearchJobSchema) => {
    jobsSearchParams.append("search", data.title);
    jobsSearchParams.append("search", data.location);
    const url = createURL("/jobs", jobsSearchParams);
    router.push(url);
    reset();
  };

  // Create an array based on the search input and if no input, return the original array
  const filteredLocationSearch = listOfLocationsFromJobs?.filter((location) =>
    location.location.toLowerCase().includes(countryInputValue.toLowerCase())
  );

  const handleCountryInput = (e: ChangeEvent<HTMLInputElement>) => {
    setShowCountryList(true);
    const value = e.target.value;
    setCountryInputValue(value);
  };

  useEffect(() => {
    setValue("location", countryInputValue);
  }, []);

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
          <LocationList
            locations={filteredLocationSearch}
            setCountryInputValue={setCountryInputValue}
            setShowCountryList={setShowCountryList}
            setValue={setValue}
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
