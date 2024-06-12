"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import SavedJobs from "../models/savedjobs.model";
import { revalidatePath } from "next/cache";

export const saveJob = async (
  job: { userId: string; jobId: string },
  path: string
) => {
  try {
    await connectToDatabase();

    await SavedJobs.create(job);
    revalidatePath(path);
  } catch (error: any) {
    handleError(error);
  }
};

export const getUserSavedJobs = async (
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
      const jobs = await SavedJobs.find({ userId })
        .skip(skips >= 0 ? skips : 0)
        .limit(limit > 0 ? limit : 10);

      // Get the total number of jobs
      const jobCount = await SavedJobs.find({}).countDocuments();
      const totalPages = Math.ceil(jobCount / limit);

      return {
        jobs: JSON.parse(JSON.stringify(jobs)),
        totalPages,
      };
    }
  } catch (error) {
    handleError(error);
  }
};

export const removeUserSavedJob = async (
  userId: string | undefined,
  jobId: string,
  path: string
) => {
  try {
    await connectToDatabase();

    if (userId) {
      await SavedJobs.deleteOne({ userId, jobId });
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
};

export const deleteSavedJobs = async (jobs: { id: string }[], path: string) => {
  try {
    await connectToDatabase();

    // Construct an array of ids from products
    const idsToDelete = jobs.map((job) => job.id);

    // Perform the deletion
    await SavedJobs.deleteMany({
      jobId: { $in: idsToDelete },
    });

    revalidatePath(path ? path : "");
  } catch (error) {
    handleError(error);
  }
};
