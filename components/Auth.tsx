"use client";

import AuthForm from "./AuthForm";

type AuthProps = {
  type: "signup" | "signin";
};

const Auth = ({ type }: AuthProps) => {
  return (
    <section className="w-full h-screen overflow-hidden">
      <div className="flex">
        <AuthForm type={type} />
        <picture className="w-[50%] h-screen sign-up-img" />
      </div>
    </section>
  );
};

export default Auth;
