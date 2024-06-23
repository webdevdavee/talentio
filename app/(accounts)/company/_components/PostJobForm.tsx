"use client";

import InputBox from "@/components/InputBox";
import { toolbarOptions } from "@/lib/react-quill";
import { PostJobFormSchema, TPostJobFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { categories } from "@/constants";
import RadioInput from "@/components/RadioInput";
import "react-quill/dist/quill.snow.css";
import DropdownButton from "@/components/DropdownButton";
import DropdownList from "@/components/DropdownList";
import useClickOutside from "@/hooks/useClickOutside";
import Loader2 from "@/components/Loader2";
import { createJob, editAJob } from "@/database/actions/job.actions";
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter, separateSalaryNumbers } from "@/lib/utils";

type PostJobFormProps = {
  type: string;
  job?: Job;
  company: Company;
};

const PostJobForm = ({ type, job, company }: PostJobFormProps) => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [jobTypeError, setJobTypeError] = useState<string>("");
  const [jobLevelError, setJobLevelError] = useState<string>("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select category");
  const [radioSelections, setRadioSelections] = useState({
    jobType: "",
    jobLevel: "",
  });

  const categoryListRef = useRef(null);

  const quillModule = {
    toolbar: toolbarOptions,
  };

  // Handle clicks outside category dropdown
  useClickOutside(categoryListRef, () => {
    setShowCategories(false);
  });

  const handleRadioChange = (type: string, label: string) => {
    setRadioSelections((prevSelections) => ({
      ...prevSelections,
      [type]: label,
    }));
  };

  // Get the job to edit salary
  const salary = separateSalaryNumbers(job ? job?.salary : "");

  // Set initial form values based on the operation type.
  const initialValues =
    job && type === "edit" && salary
      ? {
          ...job,
          salary: { from: salary[0].toString(), to: salary[1].toString() },
        }
      : {};

  // Initialize form state if editing job
  useEffect(() => {
    // Check if job is being edited
    if (job && type === "edit") {
      setSelectedCategory(job.category);
      setRadioSelections({
        // Setting the job to edit type and level to lowercase, as that is what the state expects to receive
        jobType: job.type.toLowerCase(),
        jobLevel: job.level.toLowerCase(),
      });
    }
  }, []);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TPostJobFormSchema>({
    resolver: zodResolver(PostJobFormSchema),
    defaultValues: initialValues,
  });

  // Submit form
  const onSubmit = async (data: TPostJobFormSchema) => {
    setCategoryError("");
    setJobTypeError("");
    setJobLevelError("");

    // Check if user entered category
    if (selectedCategory === "Select category") {
      setCategoryError("Select a category");
      return;
    }

    // Check if user entered job type
    if (!radioSelections.jobType) {
      setJobTypeError("Select job type");
      return;
    }

    // Check if user entered job level
    if (!radioSelections.jobLevel) {
      setJobLevelError("Select job level");
      return;
    }

    // Initialize the response variable
    let response;

    if (type === "create") {
      // Create job
      response = await createJob(
        data,
        capitalizeFirstLetter(selectedCategory),
        radioSelections,
        company
      );
    }

    if (type === "edit") {
      // If the job to edit doesn't exist, navigate back.
      if (!job) {
        router.back();
        return;
      }

      // edit job
      response = await editAJob(
        job._id,
        data,
        capitalizeFirstLetter(selectedCategory),
        radioSelections
      );
    }

    // If no error, send user to job-list page, if an error occured, get error response and display to user
    if (!response?.error) {
      reset();
      router.push("/company/dashboard/job-list");
    } else {
      setError(response.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] flex flex-col gap-8 mb-4"
    >
      {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
      <InputBox
        inputRegister={register("title")}
        label="Job title"
        htmlFor="title"
        inputType="text"
        required
        error={
          errors.title && <p className="text-red-500">{errors.title.message}</p>
        }
      />
      <span>
        <p className="font-light">
          Job description <span className="text-red-400">*</span>
        </p>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ReactQuill
              {...field}
              className="h-[15rem] mb-12"
              modules={quillModule}
              theme="snow"
            />
          )}
        />
        {errors.description && (
          <p className="text-red-500">{`${errors.description.message}`}</p>
        )}
      </span>
      <section>
        <p className="font-light">
          Job category <span className="text-red-500">*</span>
        </p>
        <div ref={categoryListRef} className="w-full flex flex-col gap-4">
          <DropdownButton
            selectedItem={selectedCategory}
            showListItem={showCategories}
            setShowListItems={setShowCategories}
          />
          <div className="relative">
            {showCategories && (
              <DropdownList
                setShowListItems={setShowCategories}
                setSelectedListItem={setSelectedCategory}
                listData={categories.map((category) => category.category)}
              />
            )}
          </div>
        </div>
        <p className="text-red-500">{categoryError}</p>
      </section>
      <div>
        <p className="font-light">
          Job type <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-col gap-3">
          <RadioInput
            id="full-time"
            name="jobType"
            label="Full-time"
            checked={radioSelections.jobType === "full-time"}
            onChange={() => handleRadioChange("jobType", "full-time")}
          />
          <RadioInput
            id="part-time"
            name="jobType"
            label="Part-time"
            checked={radioSelections.jobType === "part-time"}
            onChange={() => handleRadioChange("jobType", "part-time")}
          />
          <RadioInput
            id="remote"
            name="jobType"
            label="Remote"
            checked={radioSelections.jobType === "remote"}
            onChange={() => handleRadioChange("jobType", "remote")}
          />
          <RadioInput
            id="internship"
            name="jobType"
            label="Internship"
            checked={radioSelections.jobType === "internship"}
            onChange={() => handleRadioChange("jobType", "internship")}
          />
        </div>
        <p className="text-red-500">{jobTypeError}</p>
      </div>
      <InputBox
        inputRegister={register("location")}
        label="Location (state and country)"
        htmlFor="location"
        inputType="text"
        required
        error={
          errors.location && (
            <p className="text-red-500">{errors.location.message}</p>
          )
        }
      />
      <div>
        <p className="font-light">
          Job level <span className="text-red-500">*</span>
        </p>
        <div className="flex flex-col gap-3">
          <RadioInput
            id="entry-level"
            name="jobLevel"
            label="Entry-level"
            checked={radioSelections.jobLevel === "entry-level"}
            onChange={() => handleRadioChange("jobLevel", "entry-level")}
          />
          <RadioInput
            id="mid-level"
            name="jobLevel"
            label="Mid-level"
            checked={radioSelections.jobLevel === "mid-level"}
            onChange={() => handleRadioChange("jobLevel", "mid-level")}
          />
          <RadioInput
            id="senior-level"
            name="jobLevel"
            label="Senior-level"
            checked={radioSelections.jobLevel === "senior-level"}
            onChange={() => handleRadioChange("jobLevel", "senior-level")}
          />
        </div>
        <p className="text-red-500">{jobLevelError}</p>
      </div>
      <div>
        <p className="font-light mb-3">
          Salary range (USD / yr) <span className="text-red-500">*</span>
        </p>
        <div className="flex items-center gap-4">
          <InputBox
            inputRegister={register("salary.from")}
            label="From"
            htmlFor="location"
            inputType="number"
            inputMode="numeric"
            required
            error={
              errors?.salary?.from && (
                <p className="text-red-500">{errors.salary.from.message}</p>
              )
            }
          />
          <InputBox
            inputRegister={register("salary.to")}
            label="To"
            htmlFor="location"
            inputType="number"
            inputMode="numeric"
            required
            error={
              errors?.salary?.to && (
                <p className="text-red-500">{errors.salary.to.message}</p>
              )
            }
          />
        </div>
      </div>
      <InputBox
        inputRegister={register("capacity")}
        label="Capacity (applicants allowed)"
        htmlFor="capacity"
        inputType="number"
        inputMode="numeric"
        required
        error={
          errors.capacity && (
            <p className="text-red-500">{errors.capacity.message}</p>
          )
        }
      />
      <button
        type="submit"
        className={`w-[20%] p-3 text-white transition duration-150 ${
          isSubmitting ? "bg-gray-200" : "bg-primary transition duration-150"
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <Loader2 className="second-loader" />
        ) : (
          <p>{type === "create" ? "Create job" : "Edit job"}</p>
        )}
      </button>
    </form>
  );
};

export default PostJobForm;
