"use client";

import { TFooterFormSchema, footerFormSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const FooterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFooterFormSchema>({ resolver: zodResolver(footerFormSchema) });

  const onSubmit = async (data: TFooterFormSchema) => {
    reset();
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-white text-lg">Get job notifications</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-start gap-2"
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Email Address"
          className="px-3 py-2 bg-white"
          inputMode="email"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-primary text-white font-medium"
        >
          Subscribe
        </button>
      </form>
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}
    </div>
  );
};

export default FooterForm;
