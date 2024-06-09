"use client";

import { useForm } from "react-hook-form";
import InputBox2 from "./InputBox2";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordInput from "./PasswordInput";
import Loader2 from "./Loader2";
import { AuthSignUpFormSchema, TAuthSignUpFormSchema } from "@/lib/zod/authZod";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { createUser } from "@/database/actions/users.actions";

const AuthSignUpForm = () => {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TAuthSignUpFormSchema>({
    resolver: zodResolver(AuthSignUpFormSchema),
  });

  const onSubmit = async (data: TAuthSignUpFormSchema) => {
    setError("");
    // Register user
    const response = await createUser(data);
    if (!response?.error) {
      reset();
      router.push("/sign-in");
    }
    setError(response?.error);
  };

  return (
    <section className="w-full h-screen flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[50%] flex flex-col gap-6 items-center justify-center py-12 px-24"
      >
        {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
        <h1 className="text-2xl font-medium mb-4">Create your account</h1>
        <div className="w-full flex flex-col gap-4">
          <InputBox2
            inputRegister={register("name")}
            label="Username"
            htmlFor="name"
            inputType="text"
            required
            error={
              errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )
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
              errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
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
                <p className="text-red-500">{errors.password.message}</p>
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
            <p>Create an account</p>
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
          <p>Sign up with Google</p>
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          <p>Already have an account?</p>
          <Link href="/sign-in" className="text-primary font-bold underline">
            Sign in
          </Link>
        </div>
      </form>
      <picture className="w-[50%] h-screen auth-img"></picture>
    </section>
  );
};

export default AuthSignUpForm;
