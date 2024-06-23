import InputBox2 from "./InputBox2";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RecoverAccountEmailsSchema,
  TRecoverAccountEmailsSchemaSchema,
} from "@/lib/zod/authZod";
import Loader2 from "./Loader2";
import { findByEmail } from "@/database/actions/users.actions";

type ResetPasswordEmailInputProps = {
  moveToResetPasword: boolean;
  moveToAnswerSecurityQuestion: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setMoveToAnswerSecurityQuestion: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ResetPasswordEmailInput = ({
  moveToResetPasword,
  moveToAnswerSecurityQuestion,
  setUser,
  setMoveToAnswerSecurityQuestion,
  setError,
}: ResetPasswordEmailInputProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRecoverAccountEmailsSchemaSchema>({
    resolver: zodResolver(RecoverAccountEmailsSchema),
  });

  const onSubmit = async (data: TRecoverAccountEmailsSchemaSchema) => {
    try {
      const user = await findByEmail(data.email);
      setUser(user);
      setMoveToAnswerSecurityQuestion(true);
      reset();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6 items-center justify-center sm:gap-4"
      style={{
        display:
          moveToAnswerSecurityQuestion || moveToResetPasword ? "none" : "flex",
      }}
    >
      <h1 className="text-2xl font-medium mb-4">Enter your email</h1>
      <p className="sm:text-center">
        To begin your account recovery process, please enter the email you
        registered with.
      </p>
      <InputBox2
        inputRegister={register("email")}
        label="Email"
        htmlFor="email"
        inputType="text"
        inputMode="email"
        required
        error={
          errors.email && (
            <p className="text-red-500">{`${errors.email.message}`}</p>
          )
        }
      />
      <button
        type="submit"
        className={`w-full p-3 text-center text-white transition duration-150 ${
          isSubmitting ? "bg-gray-200" : "bg-primary transition duration-150"
        }`}
      >
        {isSubmitting ? <Loader2 className="second-loader" /> : <p>Continue</p>}
      </button>
    </form>
  );
};

export default ResetPasswordEmailInput;
