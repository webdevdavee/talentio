"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import { z } from "zod";
import ApplicationDetails from "../models/applicationdetails.model";
import { updateApplicationDetailsFormSchema } from "@/lib/zod";

export const createApplicationDetails = async (
  data: z.infer<typeof updateApplicationDetailsFormSchema>,
  userId: string
) => {
  const validatedFields = updateApplicationDetailsFormSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    await connectToDatabase();

    await ApplicationDetails.create({ ...data, userId });
  } catch (error: any) {
    handleError(error);
  }
};

export const findApplicationDetails = async (userId: string) => {
  try {
    await connectToDatabase();

    const details = await ApplicationDetails.findOne({ userId });
    return JSON.parse(JSON.stringify(details));
  } catch (error: any) {
    handleError(error);
  }
};

export const updateApplicationDetails = async (
  updateFields: z.infer<typeof updateApplicationDetailsFormSchema>,
  userId: string
) => {
  const validatedFields =
    updateApplicationDetailsFormSchema.safeParse(updateFields);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    await connectToDatabase();

    await ApplicationDetails.updateOne({ userId }, { $set: updateFields });
  } catch (error: any) {
    handleError(error);
  }
};
