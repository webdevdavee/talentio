"use client";

import { TIndividualSettingsForm, individualSettingsForm } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import InputBox from "../../../../components/ui/InputBox";
import ChangePassword from "@/app/(accounts)/individual/_components/ChangePassword";
import Loader2 from "../../../../components/ui/Loader2";
import ProfileImageUploader from "../../../../components/dashboard/ProfileImageUploader";
import { updateIndividual } from "@/database/actions/individual.action";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { deleteAccount } from "@/database/actions/users.actions";
import { signOut } from "next-auth/react";

type SettingsFormProps = {
  user: User;
};

const SettingsForm = ({ user }: SettingsFormProps) => {
  // Set initial form values.
  const initialValues = { ...user };

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | undefined>("");
  const [showChangePasswordForm, setShowPasswordForm] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TIndividualSettingsForm>({
    resolver: zodResolver(individualSettingsForm),
    defaultValues: initialValues,
  });

  const { startUpload } = useUploadThing("imageUploader");

  const onSubmit = async (data: TIndividualSettingsForm) => {
    setError("");
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
      const response = await updateIndividual(
        { ...data, image: uploadedFileUrl },
        user
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
    const response = await deleteAccount(user.userId, user.accountType);
    if (response?.error) {
      setError(response.error);
    }
    signOut({ callbackUrl: "/" });
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
          {user.provider === "credentials" && (
            <>
              <button
                type="button"
                className="w-[40%] p-3 bg-red-500 text-white mt-2 m:w-full"
                onClick={() => setShowPasswordForm((prev) => !prev)}
              >
                Change password?
              </button>
              {error && <p className="p-2 bg-red-200 text-red-500">{error}</p>}
              {showChangePasswordForm && (
                <ChangePassword register={register} errors={errors} />
              )}
            </>
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
          <div className="flex flex-col gap-3 mt-8">
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
