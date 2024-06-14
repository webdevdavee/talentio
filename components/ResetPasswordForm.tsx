"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader2 from "./Loader2";
import { ResetPasswordSchema, TResetPasswordSchema } from "@/lib/zod/authZod";
import PasswordInput from "./PasswordInput";
import bcrypt from "bcryptjs";
import { updateUserField } from "@/database/actions/individual.action";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ResetPasswordFormProps = {
  user: User | undefined;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ResetPasswordForm = ({
  user,
  setError,
  setSuccess,
}: ResetPasswordFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (data: TResetPasswordSchema) => {
    setIsLoading(true);
    setError("");
    // Confirm if the two password inputs match
    const passwordMatch = data.newPassword === data.confirmPassword;
    // If there is a match,
    if (passwordMatch) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(data.newPassword, 7);
      // Reset the user's password
      const updatedUser = await updateUserField({
        userId: user?.userId as string,
        field: "password",
        fieldData: hashedPassword,
      });
      reset();
      // If update was successful,
      if (updatedUser?.success) {
        // show success message
        setSuccess(updatedUser.success);
        // After 2.5 seconds take user back to log in page
        setTimeout(() => {
          setIsLoading(false);
          router.push("/sign-in");
        }, 2500);
      }
    } else {
      setError("Passwords do not match. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 items-center justify-center"
    >
      <h1 className="text-2xl font-medium mb-4">Reset password</h1>
      <p>Enter a new password for your account.</p>
      <div className="w-full flex flex-col gap-4">
        <PasswordInput
          inputRegister={register("newPassword")}
          label="New Password"
          htmlFor="new password"
          inputType="password"
          required
          error={
            errors.newPassword && (
              <p className="text-red-500">{`${errors.newPassword.message}`}</p>
            )
          }
        />
        <PasswordInput
          inputRegister={register("confirmPassword")}
          label="Confirm Password"
          htmlFor="confirm password"
          inputType="password"
          required
          error={
            errors.confirmPassword && (
              <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
            )
          }
        />
      </div>
      <button
        type="submit"
        className={`w-full p-3 text-center text-white transition duration-150 ${
          isLoading ? "bg-gray-200" : "bg-primary transition duration-150"
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="second-loader" />
        ) : (
          <p>Reset password</p>
        )}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
