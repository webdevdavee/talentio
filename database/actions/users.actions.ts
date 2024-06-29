"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import { z } from "zod";
import Users from "../models/users.model";
import { AuthSignInFormSchema } from "@/lib/zod/authZod";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import Individual from "../models/individual.model";
import Companies from "../models/company.model";

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

    const user = await Users.findOne({ email: email });

    if (!user) throw new Error("Email does not exists.");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};

export const addNewUserField = async ({
  email,
  accountType,
  newFieldName,
  fieldData,
}: addNewUserFieldParams) => {
  if (!fieldData) {
    return { error: "Invalid field data provided." };
  }

  const updateOperations = [];
  try {
    await connectToDatabase();

    // Determine the collection based on account type
    const collectionToUpdate =
      accountType === "individual" ? Individual : Companies;

    // Prepare the update operations for both collections
    updateOperations.push(
      collectionToUpdate.updateOne(
        { email: email },
        { $set: { [newFieldName]: fieldData } }
      ),
      Users.updateOne({ email: email }, { $set: { [newFieldName]: fieldData } })
    );

    // Execute all update operations concurrently
    const results = await Promise.all(updateOperations);

    // Check if all updates were acknowledged
    if (results.some((result) => !result.acknowledged)) {
      return { error: "An error occurred!." };
    }

    return { success: "Updated successfully." };
  } catch (error: any) {
    console.error("Error updating user field:", error);
    return { error: "A server error occurred." };
  }
};

export const deleteAccount = async (userId: string, accountType: string) => {
  try {
    await connectToDatabase();

    const collectionToUpdate =
      accountType === "individual" ? Individual : Companies;

    const updateOperations = [
      collectionToUpdate.deleteOne({ userId }),
      Users.deleteOne({ userId }),
    ];

    const results = await Promise.all(updateOperations);

    if (results.some((result) => !result.acknowledged)) {
      return { error: "An error occurred during deletion." };
    }

    return { success: true, message: "Account deleted successfully" };
  } catch (error: any) {
    console.error("Error in deleteAccount:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};
