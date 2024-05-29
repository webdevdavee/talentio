import { useForm } from "react-hook-form";
import InputBox2 from "./InputBox2";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { createUser } from "@/database/actions/user.action";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { AuthFormSchema, TAuthFormSchema } from "@/lib/zod";
import { signIn, signOut } from "next-auth/react";
import { handleError } from "@/lib/utils";
import PasswordInput from "./PasswordInput";

type AuthFormProps = {
  type: "signup" | "signin";
};

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TAuthFormSchema>({ resolver: zodResolver(AuthFormSchema) });

  const onSubmit = async (data: TAuthFormSchema) => {
    if (type === "signup") {
      try {
        setIsLoading(true);
        await createUser({ ...data, role: "user", status: "Unverified" });
        setIsLoading(false);
        setError("");
        reset();
        router.refresh();
        router.push("/");
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      try {
        setIsLoading(true);
        const response = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        if (response?.ok) {
          setIsLoading(false);
          setError("");
          reset();
          router.refresh();
          router.push("/");
        } else {
          throw new Error("Wrong username or password.");
        }
      } catch (error: any) {
        setError(error.message);
        handleError(error);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[50%] flex flex-col gap-6 items-center justify-center py-12 px-24"
    >
      {error && <p className="w-full p-2 bg-red-200 text-red-500">{error}</p>}
      <h1 className="text-2xl font-medium mb-4">
        {type === "signup" ? "Create an account" : "Sign into your account"}
      </h1>
      <div className="w-full flex flex-col gap-4">
        {type === "signup" && (
          <InputBox2
            inputRegister={register("username")}
            label="Username"
            htmlFor="username"
            inputType="text"
            required
            error={
              errors.username && (
                <p className="text-red-500">{`${errors.username.message}`}</p>
              )
            }
          />
        )}
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
      <button type="submit" className="w-full p-3 bg-primary text-white">
        {type === "signup" ? "Create account" : "Sign in"}
      </button>
      <button
        type="button"
        className="w-full flex gap-2 items-center justify-center p-3 border border-[#272829]"
      >
        <Image
          src="/companies/google.svg"
          width={20}
          height={20}
          alt="sign up"
        />
        <p>
          {type === "signup" ? "Sign up with Google" : "Sign in with Google"}
        </p>
      </button>
      {type === "signup" ? (
        <p>
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary font-bold underline">
            Sign in
          </Link>
        </p>
      ) : (
        <p>
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-primary font-bold underline">
            Sign up
          </Link>
        </p>
      )}
      {type === "signin" && (
        <button
          type="submit"
          onClick={() => signOut()}
          className="w-fit rounded-xl p-3 bg-primary text-white"
        >
          Sign out
        </button>
      )}
    </form>
  );
};

export default AuthForm;
