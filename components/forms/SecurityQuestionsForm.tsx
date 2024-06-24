"use client";

import { useForm } from "react-hook-form";
import InputBox2 from "@/components/ui/InputBox2";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import Loader2 from "@/components/ui/Loader2";
import {
  SecurityQuestionsSchema,
  TSecurityQuestionsSchema,
} from "@/lib/zod/authZod";
import DropdownButton from "../ui/DropdownButton";
import DropdownList from "../ui/DropdownList";
import useClickOutside from "@/hooks/useClickOutside";
import { addNewUserField } from "@/database/actions/users.actions";
import { useRouter } from "next/navigation";
import bcrypt from "bcryptjs";
import { securityQuestions } from "@/constants";

type SecurityQuestionsFormProps = {
  email: string | null | undefined;
  accountType: string;
};

const SecurityQuestionsForm = ({
  email,
  accountType,
}: SecurityQuestionsFormProps) => {
  const router = useRouter();
  const [showQuestions, setShowQuestions] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("Select question");
  const questionsListRef = useRef<HTMLDivElement>(null);
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
    // Makes sure the user selects a question and the email exists
    if (email && selectedQuestion !== "Select question") {
      // Hash the user's answer for improved security
      const hashedAnswer = await bcrypt.hash(data.answer, 7);
      const fieldData = { question: selectedQuestion, answer: hashedAnswer };
      // Update user's data
      const updateUser = await addNewUserField({
        email,
        accountType,
        newFieldName: "securityQuestion",
        fieldData,
      });
      // Handle error
      setError(updateUser?.error);
      reset();
      router.push(
        accountType === "individual"
          ? "/individual/dashboard"
          : "/company/dashboard"
      );
    } else {
      setError("Select a question.");
    }
  };

  // Handle clicks outside list
  useClickOutside(questionsListRef, () => {
    setShowQuestions(false);
  });

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%] flex flex-col gap-6 items-center justify-center py-12 px-24 m:w-full m:p-4 xl:p-6"
      >
        {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
        <h1 className="text-2xl font-medium mb-4">Secure Your Account</h1>
        <p>
          For your security, please answer the following questions to verify
          your identity.
        </p>
        <section
          ref={questionsListRef}
          className="mt-6 w-full flex flex-col gap-4"
        >
          <DropdownButton
            selectedItem={selectedQuestion}
            showListItem={showQuestions}
            setShowListItems={setShowQuestions}
          />
          <div className="relative">
            {showQuestions && (
              <DropdownList
                setShowListItems={setShowQuestions}
                setSelectedListItem={setSelectedQuestion}
                listData={securityQuestions}
              />
            )}
          </div>
        </section>
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
          {isSubmitting ? (
            <Loader2 className="second-loader" />
          ) : (
            <p>Complete sign up</p>
          )}
        </button>
      </form>
      <picture className="w-[50%] h-screen auth-img m:hidden"></picture>
    </section>
  );
};

export default SecurityQuestionsForm;
