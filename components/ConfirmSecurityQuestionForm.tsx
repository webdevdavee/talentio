import {
  SecurityQuestionsSchema,
  TSecurityQuestionsSchema,
} from "@/lib/zod/authZod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Loader2 from "./Loader2";
import InputBox2 from "./InputBox2";
import { useState } from "react";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

type ConfirmSecurityQuestionFormProps = {
  user: User | undefined;
  setMoveToAnswerSecurityQuestion: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setMoveToResetPasword: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmSecurityQuestionForm = ({
  user,
  setMoveToAnswerSecurityQuestion,
  setMoveToResetPasword,
}: ConfirmSecurityQuestionFormProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TSecurityQuestionsSchema>({
    resolver: zodResolver(SecurityQuestionsSchema),
  });

  const onSubmit = async (data: TSecurityQuestionsSchema) => {
    setError("");
    if (user && data.answer) {
      // Check if answers match
      const answerMatch = await bcrypt.compare(
        data.answer,
        user.securityQuestion.answer
      );
      // If answers match, take the user to the reset password
      if (answerMatch) {
        setMoveToAnswerSecurityQuestion(false);
        setMoveToResetPasword(true);
        reset();
      } else {
        setError("Incorrect answer.");
      }
    } else {
      setError("Something went wrong.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 items-center justify-center"
    >
      {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
      <h1 className="text-2xl font-medium mb-4">Answer the question below</h1>
      <p>
        To make sure this email belongs to you, please answer the below
        question.
      </p>
      <div className="relative w-full py-3 px-1 transition border-[1px] border-gray-400 focus:border-[#272829] focus:transition focus:outline-none overflow-hidden">
        <p className="text-lg text-center">{user?.securityQuestion.question}</p>
      </div>
      <div className="w-full flex flex-col gap-4">
        <InputBox2
          inputRegister={register("answer")}
          label="Answer"
          htmlFor="answer"
          inputType="text"
          inputMode="answer"
          required
          error={
            errors.answer && (
              <p className="text-red-500">{`${errors.answer.message}`}</p>
            )
          }
        />
      </div>
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

export default ConfirmSecurityQuestionForm;
