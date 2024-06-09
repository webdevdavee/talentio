"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Individual from "../models/individual.model";
import Users from "../models/users.model";
import { AuthSignInFormSchema, AuthSignUpFormSchema } from "@/lib/zod/authZod";
import bcrypt from "bcryptjs";
import { z } from "zod";
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

export const findIndividualById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await Individual.findById(userId);

    if (!user) throw new Error("No user found.");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};

export const OauthUserLogin = async (user: any) => {
  try {
    await connectToDatabase();

    const existingUser = await Individual.findOne({ email: user.email });

    if (existingUser) {
      return { error: "Email already in use." };
    }

    const newUser = {
      ...user,
      userId: uuidv4(),
      accountType: "individual",
    };

    // Save user in all users collection and individual collection
    await Promise.all([Users.create(newUser), Individual.create(newUser)]);
  } catch (error: any) {
    handleError(error);
  }
};

export const updateUserField = async ({
  userId,
  field,
  fieldData,
}: updateUserFieldParams) => {
  if (!fieldData) {
    return { error: "Invalid field." };
  }

  await connectToDatabase();
  try {
    const updatedUser = await Individual.updateOne(
      { _id: userId },
      { $set: { [field]: fieldData } }
    );

    if (!updatedUser.acknowledged) {
      return { error: "Somethig went wrong." };
    }

    if (updatedUser.modifiedCount === 1 && updatedUser.acknowledged) {
      return { success: "Reset successful! Taking you back to log in." };
    }
  } catch (error: any) {
    handleError(error);
  }
};
