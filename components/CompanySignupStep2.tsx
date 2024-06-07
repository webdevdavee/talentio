import {
  CompanySignUpFormSchema2,
  TCompanySignUpFormSchema2,
} from "@/lib/zod/authZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import TextArea from "./TextArea";
import { useState } from "react";
import ImageUploader from "./ImageUploader";
import Loader2 from "./Loader2";
import ListInput from "./ListInput";
import { useUploadThing } from "@/lib/utils/uploadthing";

type CompanySignupStep2Props = {
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (newData: any) => void;
  error: string | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const CompanySignupStep2 = ({
  nextStep,
  prevStep,
  updateFormData,
  error,
  setError,
}: CompanySignupStep2Props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [industry, setIndustry] = useState<string[]>([]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCompanySignUpFormSchema2>({
    resolver: zodResolver(CompanySignUpFormSchema2),
  });

  const { startUpload } = useUploadThing("imageUploader");

  const onSubmit = async (data: TCompanySignUpFormSchema2) => {
    // Initialize the URL for the featured image.
    let uploadedImageUrl = data.logo;

    // If there are files to upload, start the upload process.
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      // If the upload fails, exit the function early.
      if (!uploadedImages) {
        return;
      }

      // Update the featured image URL with the first uploaded image's URL.
      uploadedImageUrl = uploadedImages[0].url;
    }

    updateFormData({
      step2Data: { ...data, logo: uploadedImageUrl, industry },
    });
    nextStep();
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <ListInput
        label="Industry"
        data={industry}
        setData={setIndustry}
        error={error}
        setError={setError}
      />
      <TextArea
        inputRegister={register("about")}
        label="About"
        htmlFor="about"
        inputType="text"
        style="max-h-[10rem] min-h-[6rem] overflow-y-auto"
        required
        error={
          errors.about && <p className="text-red-500">{errors.about.message}</p>
        }
      />
      <Controller
        name="logo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ImageUploader
            type="big"
            onFieldChange={field.onChange}
            imageUrl={field.value}
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
        {isSubmitting ? <Loader2 className="second-loader" /> : <p>Continue</p>}
      </button>

      <button
        type="button"
        className="w-full p-3 text-red-500 transition duration-150"
        onClick={prevStep}
      >
        <p>Go to previous</p>
      </button>
    </form>
  );
};

export default CompanySignupStep2;
