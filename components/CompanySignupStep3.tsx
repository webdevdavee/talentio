import {
  CompanySignUpFormSchema3,
  TCompanySignUpFormSchema3,
} from "@/lib/zod/authZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputBox2 from "./InputBox2";
import Loader2 from "./Loader2";
import { useRouter } from "next/navigation";
import { createCompany } from "@/database/actions/users.actions";

type Step1 = {
  size: string;
  name: string;
  email: string;
  password: string;
};

type Step2 = {
  industry: string[];
  about: string;
  logo: string;
};

type Step3 = {
  twitter: string;
  facebook: string;
  linkedin: string;
  mail: string;
};

type CompanySignupStep3Props = {
  prevStep: () => void;
  updateFormData: (newData: any) => void;
  formData: {
    step1Data: Step1;
    step2Data: Step2;
    step3Data: Step3;
  };
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const CompanySignupStep3 = ({
  prevStep,
  updateFormData,
  formData,
  setError,
}: CompanySignupStep3Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TCompanySignUpFormSchema3>({
    resolver: zodResolver(CompanySignUpFormSchema3),
  });

  const onSubmit = async (data: TCompanySignUpFormSchema3) => {
    updateFormData({ step3Data: data });
    const signupData = {
      ...formData.step1Data,
      ...formData.step2Data,
      ...data,
    };
    // Create company
    const response = await createCompany(signupData);
    if (!response?.error) {
      reset();
      router.push("/sign-in");
    }
    setError(response?.error);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <h2 className="text-xl font-medium mb-4">Contacts</h2>
      <div className="w-full flex flex-col gap-4">
        <InputBox2
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
        <InputBox2
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
        <InputBox2
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
        <InputBox2
          inputRegister={register("mail")}
          label="Mail"
          htmlFor="mail"
          inputType="text"
          inputMode="email"
          required
          error={
            errors.mail && <p className="text-red-500">{errors.mail.message}</p>
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
            <p>Create account</p>
          )}
        </button>
      </div>
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

export default CompanySignupStep3;
