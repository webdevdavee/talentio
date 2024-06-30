"use client";

import { SettingsFormSchema, TSettingsFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputBox from "@/components/ui/InputBox";
import ChangePassword from "./ChangePassword";
import Loader2 from "@/components/ui/Loader2";
import ProfileImageUploader from "@/components/dashboard/ProfileImageUploader";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { deleteAccount } from "@/database/actions/users.actions";
import { updateCompany } from "@/database/actions/company.actions";
import TextArea from "@/components/ui/TextArea";
import { extractEmployeeCount } from "@/lib/utils";
import DropdownListInput from "@/components/ui/DropdownListInput";
import { industries } from "@/constants";

type SettingsFormProps = {
  company: Company;
};

const SettingsForm = ({ company }: SettingsFormProps) => {
  // Set initial form values.
  const initialValues = {
    ...company,
    name: company.company,
    image: company.logo,
    company_size: extractEmployeeCount(company.company_size)?.toString(),
    twitter: company.contact[0],
    facebook: company.contact[1],
    linkedin: company.contact[2],
    mail: company.contact[3],
  };

  const [files, setFiles] = useState<File[]>([]);
  const [industry, setIndustry] = useState<string[]>([...company.industry]);
  const [industryError, setIndustryError] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");
  const [showChangePasswordForm, SetShowPasswordForm] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSettingsFormSchema>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: initialValues,
  });

  const { startUpload } = useUploadThing("imageUploader");

  const onSubmit = async (data: TSettingsFormSchema) => {
    setError("");
    setIndustryError("");

    // Check if industry was provided, if not throw an error and break the onSubmit function
    if (industry.length < 1) {
      setIndustryError("Required");
      return;
    }

    // Initialize the URL for the resume.
    let uploadedFileUrl = data.image;

    try {
      // If there are files to upload, start the upload process.
      if (files.length > 0) {
        const uploadedImage = await startUpload(files);
        // If the upload fails, exit the function early.
        if (!uploadedImage) {
          return;
        }
        // Update the featured File URL with the first uploaded File's URL.
        uploadedFileUrl = uploadedImage[0].url;
      }
      // Update user
      const response = await updateCompany(
        { ...data, image: uploadedFileUrl },
        company,
        industry
      );
      setError(response.error);
      // If no errors, refresh page
      if (!response?.error) {
        location.reload();
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserAccount = async () => {
    const response = await deleteAccount(company.userId, company.accountType);
    if (response?.error) {
      setError(response.error);
    }
  };

  return (
    <section className="w-[50%] m:w-full xl:w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="flex flex-col">
              <h2 className="text-lg font-medium">Profile picture</h2>
              <p className="text-sm">We support only SVG, PNG and JPEG</p>
            </span>
            <span>
              <Controller
                name="image"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <ProfileImageUploader
                    type="big"
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                )}
              />
            </span>
          </div>
          <InputBox
            inputRegister={register("name")}
            label="Username"
            htmlFor="name"
            inputType="text"
            required
            error={
              errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )
            }
          />
          <InputBox
            inputRegister={register("email")}
            label="Email"
            htmlFor="email"
            inputType="text"
            inputMode="email"
            required
            error={
              errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )
            }
          />
          <TextArea
            inputRegister={register("about")}
            label="About"
            htmlFor="about"
            inputType="text"
            style="max-h-[10rem] min-h-[6rem] overflow-y-auto"
            required
            error={
              errors.about && (
                <p className="text-red-500">{errors.about.message}</p>
              )
            }
          />
          <InputBox
            inputRegister={register("company_size")}
            label="Size"
            htmlFor="company_size"
            inputType="number"
            inputMode="email"
            required
            error={
              errors.company_size && (
                <p className="text-red-500">{errors.company_size.message}</p>
              )
            }
          />
          <div>
            <DropdownListInput
              dropdownData={industries.map((industry) => industry.industry)}
              data={industry}
              setData={setIndustry}
              label="Industry"
              secondaryText="Select your industry"
              required
            />
            <p className="text-red-500">{industryError}</p>
          </div>
          <div>
            <h2 className="text-xl font-medium mb-4">Contacts</h2>
            <div className="w-full flex flex-col gap-4">
              <InputBox
                inputRegister={register("twitter")}
                label="Twitter (must be a url)"
                htmlFor="twitter"
                inputType="text"
                required
                error={
                  errors.twitter && (
                    <p className="text-red-500">{errors.twitter.message}</p>
                  )
                }
              />
              <InputBox
                inputRegister={register("facebook")}
                label="Facebook (must be a url)"
                htmlFor="facebook"
                inputType="text"
                required
                error={
                  errors.facebook && (
                    <p className="text-red-500">{errors.facebook.message}</p>
                  )
                }
              />
              <InputBox
                inputRegister={register("linkedin")}
                label="Linkedin (must be a url)"
                htmlFor="linkedin"
                inputType="text"
                required
                error={
                  errors.linkedin && (
                    <p className="text-red-500">{errors.linkedin.message}</p>
                  )
                }
              />
              <InputBox
                inputRegister={register("mail")}
                label="Mail"
                htmlFor="mail"
                inputType="text"
                inputMode="email"
                required
                error={
                  errors.mail && (
                    <p className="text-red-500">{errors.mail.message}</p>
                  )
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="w-[40%] p-3 bg-red-500 text-white mt-2 m:w-full"
            onClick={() => SetShowPasswordForm((prev) => !prev)}
          >
            Change password?
          </button>
          {error && <p className="p-2 bg-red-200 text-red-500">{error}</p>}
          {showChangePasswordForm && (
            <ChangePassword register={register} errors={errors} />
          )}
          <button
            type="submit"
            className={`w-[40%] p-3 text-white transition duration-150 m:w-full ${
              isSubmitting
                ? "bg-gray-200"
                : "bg-primary transition duration-150"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="second-loader" />
            ) : (
              <p>Update profile</p>
            )}
          </button>
          <div className="flex flex-col gap-3 mt-8 m:w-full">
            <h3>
              Deleting your account clears all your data. This action is not
              reversible.
            </h3>
            <button
              type="button"
              className="w-[40%] p-3 bg-red-600 text-white m:w-full"
              onClick={deleteUserAccount}
            >
              Delete account
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SettingsForm;
