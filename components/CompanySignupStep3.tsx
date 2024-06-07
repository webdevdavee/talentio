import {
  CompanySignUpFormSchema3,
  TCompanySignUpFormSchema3,
} from "@/lib/zod/authZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputBox2 from "./InputBox2";
import Loader2 from "./Loader2";

type CompanySignupStep3Props = {
  prevStep: () => void;
  updateFormData: (newData: any) => void;
  formData: {
    step1Data: {};
    step2Data: {};
    step3Data: {};
  };
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const CompanySignupStep3 = ({
  prevStep,
  updateFormData,
  formData,
  setError,
}: CompanySignupStep3Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TCompanySignUpFormSchema3>({
    resolver: zodResolver(CompanySignUpFormSchema3),
  });

  const onSubmit = async (data: TCompanySignUpFormSchema3) => {
    updateFormData({ step3Data: data });
  };
  console.log("Form data:", formData);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-3"
    >
      <h2 className="text-xl font-medium mb-4">Contacts</h2>
      <div className="w-full flex flex-col gap-4">
        <InputBox2
          inputRegister={register("twitter")}
          label="Twitter"
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
          label="Facebook"
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
          label="Linkedin"
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
