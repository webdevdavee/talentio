"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Individual from "../models/individual.model";
import Users from "../models/users.model";
import Companies from "../models/company.model";

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
      accountType: "individual",
    };

    // Save user in all users collection and individual collection
    await Promise.all([Users.create(newUser), Individual.create(newUser)]);
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
