"use server";

import { connectToDatabase } from "..";
import { formatNumberWithCommas, handleError } from "@/lib/utils";
import { z } from "zod";
import bcrypt from "bcryptjs";
import Users from "../models/users.model";
import { AuthSignInFormSchema, AuthSignUpFormSchema } from "@/lib/zod/authZod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import Individual from "../models/individual.model";
import Companies from "../models/company.model";
import { CompanySignUpFormSchema } from "@/lib/zod/authZod";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (
  data: z.infer<typeof AuthSignUpFormSchema>
) => {
  try {
    await connectToDatabase();

    const validatedFields = AuthSignUpFormSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid credentials." };
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 7);

    // Check for duplicate email or name
    const existingUser = await Users.findOne({
      $or: [{ email: email }, { name: name }],
    });

    if (existingUser) {
      return { error: "Username or email already in use." };
    }

    const user = {
      userId: uuidv4(),
      name,
      email,
      password: hashedPassword,
      image: "/images/default-avatar.webp",
      accountType: "individual",
      provider: "credentials",
    };

    // Save user in all users collection and individual collection
    await Promise.all([Users.create(user), Individual.create(user)]);

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

export const createCompany = async (
  data: z.infer<typeof CompanySignUpFormSchema>
) => {
  try {
    await connectToDatabase();

    const validatedFields = CompanySignUpFormSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid credentials." };
    }

    const {
      name,
      email,
      password,
      size,
      industry,
      about,
      logo,
      twitter,
      facebook,
      linkedin,
      mail,
    } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 7);

    // Check for duplicate email or name
    const existingCompany = await Companies.findOne({
      $or: [{ email: email }, { company: name }],
    });

    if (existingCompany) {
      return { error: "Name or email already in use." };
    }

    // Format size with commas
    const formattedSize = formatNumberWithCommas(size);

    // Create a user or company id
    const userId = uuidv4();

    // Construct the company
    const company = {
      userId,
      company: name,
      email,
      about,
      password: hashedPassword,
      logo,
      industry,
      company_size: `${formattedSize}+ employees`,
      contact: [twitter, facebook, linkedin, mail],
      accountType: "company",
      provider: "credentials",
    };

    // Save company in all users collection and companies collection
    await Promise.all([
      Users.create({
        userId,
        name,
        email,
        password: hashedPassword,
        image: logo,
        accountType: "company",
        provider: "credentials",
      }),
      Companies.create(company),
    ]);

    console.log("Company created!");
  } catch (error: any) {
    console.error(error);
    handleError(error);
  }
};

export const findByEmail = async (email: string) => {
  try {
    await connectToDatabase();

    const user = await Users.findOne({ email: email });

    if (!user) throw new Error("Email does not exists.");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};
