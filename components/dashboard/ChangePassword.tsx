import { FieldErrors, UseFormRegister } from "react-hook-form";
import PasswordInput2 from "../ui/PasswordInput2";

type ChangePasswordProps = {
  register: UseFormRegister<{
    name: string;
    email: string;
    about: string;
    company_size: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    mail: string;
    image: string;
    currentPassword?: string | undefined;
    newPassord?: string | undefined;
    confirmPassword?: string | undefined;
  }>;
  errors: FieldErrors<{
    name: string;
    email: string;
    about: string;
    company_size: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    mail: string;
    image: string;
    currentPassword?: string | undefined;
    newPassord?: string | undefined;
    confirmPassword?: string | undefined;
  }>;
};

const ChangePassword = ({ register, errors }: ChangePasswordProps) => {
  return (
    <section>
      <div className="flex flex-col gap-4">
        <PasswordInput2
          inputRegister={register("currentPassword")}
          label="Current password"
          htmlFor="name"
          inputType="text"
          required
          error={
            errors.name && <p className="text-red-500">{errors.name.message}</p>
          }
        />
        <PasswordInput2
          inputRegister={register("newPassord")}
          label="New password"
          htmlFor="name"
          inputType="text"
          required
          error={
            errors.newPassord && (
              <p className="text-red-500">{errors.newPassord.message}</p>
            )
          }
        />
        <PasswordInput2
          inputRegister={register("confirmPassword")}
          label="Confirm password"
          htmlFor="name"
          inputType="text"
          required
          error={
            errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )
          }
        />
      </div>
    </section>
  );
};

export default ChangePassword;
