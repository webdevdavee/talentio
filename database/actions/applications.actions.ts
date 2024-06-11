"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Applications from "../models/applications.model";
import { z } from "zod";
import { jobApplicationFormSchema } from "@/lib/zod";

export const createApplication = async (
  application: z.infer<typeof jobApplicationFormSchema>,
  jobId: string,
  userId: string
) => {
  const validatedFields = jobApplicationFormSchema.safeParse(application);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    await connectToDatabase();

    const newApplication = await Applications.create({
      ...application,
      jobId,
      userId,
    });

    console.log(newApplication);
  } catch (error: any) {
    handleError(error);
  }
};

export const getUserApplications = async (
  userId: string | undefined,
  page = 1,
  limit = 10
) => {
  try {
    await connectToDatabase();

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    if (userId) {
      // find all the items that match the user id
      const applications = await Applications.find({ userId })
        .skip(skips >= 0 ? skips : 0)
        .limit(limit > 0 ? limit : 10);

      // Get the total number of applications
      const applicationsCount = await Applications.find({}).countDocuments();
      const totalPages = Math.ceil(applicationsCount / limit);

      return {
        applications: JSON.parse(JSON.stringify(applications)),
        totalPages,
      };
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const getUserApplicationByJobId = async (jobId: string) => {
  try {
    await connectToDatabase();
    const application = await Applications.find({ jobId });
    if (!application) {
      throw new Error("Application not found");
    }
    return JSON.parse(JSON.stringify(application));
  } catch (error: any) {
    handleError(error);
  }
};
