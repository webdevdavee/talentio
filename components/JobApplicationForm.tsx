import { TJobApplicationFormSchema, jobApplicationFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import InputBox from "./InputBox";
import TextArea from "./TextArea";
import FileUploader from "./FileUploader";
import { useState } from "react";
import { useUploadThing } from "@/lib/utils/uploadthing";

const JobApplicationForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TJobApplicationFormSchema>({
    resolver: zodResolver(jobApplicationFormSchema),
  });

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("fileUploader");

  const onSubmit = async (data: TJobApplicationFormSchema) => {
    // Initialize the URL for the resume.
    let uploadedImageUrl = data.resume;

    try {
      // If there are files to upload, start the upload process.
      if (files.length > 0) {
        const uploadedPDF = await startUpload(files);
        // If the upload fails, exit the function early.
        if (!uploadedPDF) {
          return;
        }
        // Update the featured image URL with the first uploaded image's URL.
        uploadedImageUrl = uploadedPDF[0].url;
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-4 bg-white">
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
                <p className="text-red-500">{`${errors.firstname.message}`}</p>
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
                <p className="text-red-500">{`${errors.lastname.message}`}</p>
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
              <p className="text-red-500">{`${errors.email.message}`}</p>
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
              <p className="text-red-500">{`${errors.phone.message}`}</p>
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
              <p className="text-red-500">{`${errors.nationality.message}`}</p>
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
              <p className="text-red-500">{`${errors.coverletter.message}`}</p>
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
          className="w-full px-4 py-3 bg-primary text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default JobApplicationForm;
