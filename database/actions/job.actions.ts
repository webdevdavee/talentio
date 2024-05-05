"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Jobs from "../models/job.model";

export const getJobs = async () => {
  try {
    await connectToDatabase();

    const jobs = await Jobs.find({});

    return JSON.parse(JSON.stringify(jobs));
  } catch (error) {
    handleError(error);
  }
};

export const getJobsCategoryCount = async () => {
  try {
    await connectToDatabase();

    const result = await Jobs.aggregate([
      {
        $group: {
          _id: "$category", // Group by the category field
          count: { $sum: 1 }, // Count the number of documents in each group
        },
      },
      {
        $sort: { count: -1 }, // Optional: sort categories by count in descending order
      },
    ]);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
};
