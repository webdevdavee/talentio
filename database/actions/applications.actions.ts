"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Applications from "../models/applications.model";
import { z } from "zod";
import { jobApplicationFormSchema } from "@/lib/zod";
import { revalidatePath } from "next/cache";

export const createApplication = async (
  application: z.infer<typeof jobApplicationFormSchema>,
  jobId: string,
  companyId: string,
  userId: string
) => {
  const validatedFields = jobApplicationFormSchema.safeParse(application);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  try {
    await connectToDatabase();

    await Applications.create({
      ...application,
      companyId,
      jobId,
      userId,
      score: 0.0,
      stage: "submission",
    });
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

export const getUserApplicationById = async (id: string) => {
  try {
    await connectToDatabase();
    const application = await Applications.findById(id);
    if (!application) {
      throw new Error("Application not found");
    }
    return JSON.parse(JSON.stringify(application));
  } catch (error: any) {
    handleError(error);
  }
};

export const deleteApplication = async (
  applications: { id: string }[],
  path: string
) => {
  try {
    await connectToDatabase();

    // Construct an array of ids from products
    const idsToDelete = applications.map((application) => application.id);

    // Perform the deletion
    await Applications.deleteMany({
      _id: { $in: idsToDelete },
    });

    revalidatePath(path);
  } catch (error: any) {
    handleError(error);
  }
};

export const getApplicants = async (
  companyId: string,
  page = 1,
  limit = 10
) => {
  try {
    await connectToDatabase();

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    if (companyId) {
      // find all the items that match the company id
      const applicants = await Applications.find({ companyId })
        .skip(skips >= 0 ? skips : 0)
        .limit(limit > 0 ? limit : 10);

      // Get the total number of applications
      const applicantsCount = await Applications.find({}).countDocuments();
      const totalPages = Math.ceil(applicantsCount / limit);

      return {
        applicants: JSON.parse(JSON.stringify(applicants)),
        totalPages,
      };
    }
  } catch (error: any) {
    handleError(error);
  }
};
