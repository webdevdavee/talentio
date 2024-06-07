import {
  CompanySignUpFormSchema1,
  TCompanySignUpFormSchema1,
} from "@/lib/zod/authZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputBox2 from "./InputBox2";
import PasswordInput from "./PasswordInput";
import Loader2 from "./Loader2";

type CompanySignupStep1Props = {
  nextStep: () => void;
  updateFormData: (newData: any) => void;
};

const CompanySignupStep1 = ({
  nextStep,
  updateFormData,
}: CompanySignupStep1Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCompanySignUpFormSchema1>({
    resolver: zodResolver(CompanySignUpFormSchema1),
  });

  const onSubmit = async (data: TCompanySignUpFormSchema1) => {
    updateFormData({ step1Data: data });
    nextStep();
    reset();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <InputBox2
        inputRegister={register("name")}
        label="Username"
        htmlFor="name"
        inputType="text"
        required
        error={
          errors.name && <p className="text-red-500">{errors.name.message}</p>
        }
      />
      <InputBox2
        inputRegister={register("email")}
        label="Email"
        htmlFor="email"
        inputType="text"
        inputMode="email"
        required
        error={
          errors.email && <p className="text-red-500">{errors.email.message}</p>
        }
      />
      <PasswordInput
        inputRegister={register("password")}
        label="Password"
        htmlFor="password"
        inputType="password"
        required
        error={
          errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )
        }
      />
      <InputBox2
        inputRegister={register("size")}
        label="Staff size"
        htmlFor="size"
        inputType="number"
        inputMode="numeric"
        required
        error={
          errors.size && <p className="text-red-500">{errors.size.message}</p>
        }
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
    </form>
  );
};

export default CompanySignupStep1;
