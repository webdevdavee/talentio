"use client";

import {
  updateApplicationDetailsFormSchema,
  TUpdateApplicationDetailsFormSchema,
} from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputBox from "@/components/ui/InputBox";
import TextArea from "@/components/ui/TextArea";
import Loader2 from "@/components/ui/Loader2";
import {
  createApplicationDetails,
  updateApplicationDetails,
} from "@/database/actions/applicationdetails.actions";
import { initialApplicationDetails } from "@/constants";

type ApplicationDetailsFormProps = {
  user: User;
  applicationDetails: UserApplicationDetails;
};

const ApplicationDetailsForm = ({
  user,
  applicationDetails,
}: ApplicationDetailsFormProps) => {
  // Set initial form values.
  const initialValues = applicationDetails ?? initialApplicationDetails;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TUpdateApplicationDetailsFormSchema>({
    resolver: zodResolver(updateApplicationDetailsFormSchema),
    defaultValues: initialValues,
  });

  const [error, setError] = useState<string | undefined>("");

  const onSubmit = async (data: TUpdateApplicationDetailsFormSchema) => {
    setError("");
    try {
      if (!applicationDetails) {
        // Create user application
        const response = await createApplicationDetails(data, user.userId);
        // If no errors, take user to their dashboard to see their application
        if (!response?.error) {
          location.reload();
        }
        setError(response?.error);
      } else {
        // Create user application
        const response = await updateApplicationDetails(data, user.userId);
        // If no errors, take user to their dashboard to see their application
        if (!response?.error) {
          location.reload();
        }
        setError(response?.error);
      }
    } catch (error) {
      console.log(error);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-[50%] bg-white">
      {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
      <h2>
        Update your application details{" "}
        <b>
          (so you do not have to fill the application form everytime you apply
          to jobs).
        </b>
      </h2>
      <div className="mt-4 flex flex-col gap-4">
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
          inputType="tel"
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
            <p>
              {applicationDetails
                ? "Update application details"
                : "Create application details"}
            </p>
          )}
        </button>
      </div>
    </form>
  );
};

export default ApplicationDetailsForm;
