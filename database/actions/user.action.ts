"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { AuthSignInFormSchema, AuthSignUpFormSchema } from "@/lib/zod/authZod";
import { z } from "zod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const createUser = async (
  data: z.infer<typeof AuthSignUpFormSchema>
) => {
  try {
    await connectToDatabase();

    const validatedFields = AuthSignUpFormSchema.safeParse(data);
    if (!validatedFields.success) {
      throw new Error("Invalid fields");
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 7);

    // Check for duplicate email or name
    const existingUser = await User.findOne({
      $or: [{ email: email }, { name: name }],
    });

    if (existingUser) {
      return { error: "Username or email already in use." };
    }

    const user = {
      name,
      email,
      password: hashedPassword,
      image: "/images/default-avatar.webp",
      accountType: "individual",
      emailVerified: null,
    };

    await User.create(user);

    console.log("User created!");
  } catch (error: any) {
    handleError(error);
  }
};

export const loginUser = async (data: z.infer<typeof AuthSignInFormSchema>) => {
  const validatedFields = AuthSignInFormSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;
  const user = {
    email,
    password,
  };

  try {
    await signIn("credentials", {
      ...user,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      if (error.cause) {
        return { error: error.cause.err?.message };
      }
    }
    throw error;
  }
};

export const findByEmail = async (email: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email: email });

    if (!user) throw new Error("No user found.");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};

export const findById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("No user found.");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};

export const OauthUserLogin = async (user: any) => {
  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email: user.email });

    if (existingUser) {
      return { error: "Email already in use." };
    }

    await User.create({
      ...user,
      accountType: "individual",
    });
  } catch (error: any) {
    handleError(error);
  }
};
