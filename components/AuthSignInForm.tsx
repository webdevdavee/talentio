"use client";

import { useForm } from "react-hook-form";
import InputBox2 from "./InputBox2";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import Loader2 from "./Loader2";
import { AuthSignInFormSchema, TAuthSignInFormSchema } from "@/lib/zod/authZod";
import { signIn } from "next-auth/react";
import { loginUser } from "@/database/actions/user.action";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

const AuthSignInForm = () => {
  const [error, setError] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TAuthSignInFormSchema>({
    resolver: zodResolver(AuthSignInFormSchema),
  });

  const onSubmit = async (data: TAuthSignInFormSchema) => {
    setError("");
    const response = await loginUser(data);
    setError(response?.error);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%] flex flex-col gap-6 items-center justify-center py-12 px-24"
      >
        {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
        <h1 className="text-2xl font-medium mb-4">Sign into your account</h1>
        <div className="w-full flex flex-col gap-4">
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
          <PasswordInput
            inputRegister={register("password")}
            label="Password"
            htmlFor="password"
            inputType="password"
            required
            error={
              errors.password && (
                <p className="text-red-500">{`${errors.password.message}`}</p>
              )
            }
          />
        </div>
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
            <p>Sign in</p>
          )}
        </button>
        <button
          type="button"
          className="w-full flex gap-2 items-center justify-center p-3 border border-[#272829]"
          onClick={() =>
            signIn("google", { callbackUrl: DEFAULT_LOGIN_REDIRECT })
          }
        >
          <Image
            src="/companies/google.svg"
            width={20}
            height={20}
            alt="sign up"
          />
          <p>Sign in with Google</p>
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          <p>Don&apos;t have an account?</p>
          <Link href="/sign-up" className="text-primary font-bold underline">
            Sign up
          </Link>
        </div>
      </form>
      <picture className="w-[50%] h-screen auth-img"></picture>
    </section>
  );
};

export default AuthSignInForm;
