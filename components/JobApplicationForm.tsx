"use client";

import { TJobApplicationFormSchema, jobApplicationFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import InputBox from "./InputBox";
import TextArea from "./TextArea";
import FileUploader from "./FileUploader";
import { useState } from "react";
import { useUploadThing } from "@/lib/utils/uploadthing";
import Link from "next/link";
import { createApplication } from "@/database/actions/applications.actions";
import { useRouter } from "next/navigation";
import Loader2 from "./Loader2";

type JobApplicationFormProps = {
  job: Job;
  userId: string | undefined;
};

const JobApplicationForm = ({ job, userId }: JobApplicationFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TJobApplicationFormSchema>({
    resolver: zodResolver(jobApplicationFormSchema),
  });

  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("fileUploader");

  const onSubmit = async (data: TJobApplicationFormSchema) => {
    setError("");
    // Initialize the URL for the resume.
    let uploadedFileUrl = data.resume;

    try {
      // If there are files to upload, start the upload process.
      if (files.length > 0) {
        const uploadedPDF = await startUpload(files);
        // If the upload fails, exit the function early.
        if (!uploadedPDF) {
          return;
        }
        // Update the featured File URL with the first uploaded File's URL.
        uploadedFileUrl = uploadedPDF[0].url;
      }
      // Create user application
      const response = await createApplication(
        {
          ...data,
          resume: uploadedFileUrl,
        },
        job._id,
        userId as string
      );
      // If no errors, take user to their dashboard to see their application
      if (!response?.error) {
        reset();
        router.push("/individual/dashboard");
      }
      setError(response?.error);
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[50%] bg-white">
      {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
      {job ? (
        <h1 className="mb-10 w-full text-center text-xl font-semibold">
          Apply to{" "}
          <Link
            href={`/job/${job._id}`}
            className="text-primary underline"
          >{`${job?.title} (${job?.level}) at ${job?.company}`}</Link>
        </h1>
      ) : (
        <p className="mb-10 w-full text-center text-xl font-semibold">
          Loading...
        </p>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <InputBox
            inputRegister={register("firstname")}
            label="First Name"
            htmlFor="firstname"
            inputType="text"
            required
            error={
              errors.firstname && (
                <p className="text-red-500">{errors.firstname.message}</p>
              )
            }
          />
          <InputBox
            inputRegister={register("lastname")}
            label="Last Name"
            htmlFor="lastname"
            inputType="text"
            required
            error={
              errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )
            }
          />
        </div>
        <InputBox
          inputRegister={register("email")}
          label="Email"
          htmlFor="email"
          inputType="text"
          required
          inputMode="email"
          error={
            errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )
          }
        />
        <InputBox
          inputRegister={register("phone")}
          label="Phone Number"
          htmlFor="phone"
          inputType="text"
          required
          inputMode="tel"
          error={
            errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )
          }
        />
        <InputBox
          inputRegister={register("nationality")}
          label="Nationality"
          htmlFor="nationality"
          inputType="text"
          required
          error={
            errors.nationality && (
              <p className="text-red-500">{errors.nationality.message}</p>
            )
          }
        />
        <TextArea
          inputRegister={register("coverletter")}
          label="Cover Letter"
          htmlFor="coverletter"
          inputType="text"
          required
          style="max-h-[17rem] min-h-[12rem] overflow-y-auto"
          error={
            errors.coverletter && (
              <p className="text-red-500">{errors.coverletter.message}</p>
            )
          }
        />
        <Controller
          name="resume"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FileUploader
              files={files}
              onFieldChange={field.onChange}
              fileUrl={field.value}
              setFiles={setFiles}
            />
          )}
        />
        <button
          type="submit"
          className={`w-full p-3 text-white transition duration-150 ${
            isSubmitting ? "bg-gray-200" : "bg-primary transition duration-150"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="second-loader" />
          ) : (
            <p>Submit Application</p>
          )}
        </button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
