"use client";

import ConfirmSecurityQuestionForm from "../forms/ConfirmSecurityQuestionForm";
import { useState } from "react";
import ResetPasswordForm from "../forms/ResetPasswordForm";
import ResetPasswordEmailInput from "../ui/ResetPasswordEmailInput";

const ResetPasswordWrapper = () => {
  const [moveToAnswerSecurityQuestion, setMoveToAnswerSecurityQuestion] =
    useState(false);
  const [moveToResetPasword, setMoveToResetPasword] = useState(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="w-[50%] py-12 px-24 sm:w-full sm:p-4">
        {error && (
          <p className="w-full p-2 bg-red-200 text-red-500 mb-6 sm:text-center">
            {error}
          </p>
        )}
        {success && (
          <p className="w-full p-2 bg-green-100 text-green-600 mb-6 sm:text-center">
            {success}
          </p>
        )}
        <ResetPasswordEmailInput
          moveToResetPasword={moveToResetPasword}
          moveToAnswerSecurityQuestion={moveToAnswerSecurityQuestion}
          setUser={setUser}
          setMoveToAnswerSecurityQuestion={setMoveToAnswerSecurityQuestion}
          setError={setError}
        />
        {moveToAnswerSecurityQuestion && (
          <ConfirmSecurityQuestionForm
            user={user}
            setMoveToAnswerSecurityQuestion={setMoveToAnswerSecurityQuestion}
            setMoveToResetPasword={setMoveToResetPasword}
          />
        )}
        {moveToResetPasword && (
          <ResetPasswordForm
            user={user}
            setError={setError}
            setSuccess={setSuccess}
          />
        )}
      </div>
      <picture className="w-[50%] h-screen reset-pwd-img sm:hidden"></picture>
    </section>
  );
};

export default ResetPasswordWrapper;
