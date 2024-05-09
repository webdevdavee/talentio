"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Jobs from "../models/job.model";

export const getJobs = async (page = 1, limit = 10) => {
  try {
    await connectToDatabase();

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    const jobs = await Jobs.find({})
      .find({})
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    // Get the total number of jobs
    const jobCount = await Jobs.find({}).countDocuments();
    const totalPages = Math.ceil(jobCount / limit);

    return {
      jobs: JSON.parse(JSON.stringify(jobs)),
      totalPages,
    };
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

export const getJobsWithFrequency = async (field: string) => {
  try {
    await connectToDatabase();

    const result = await Jobs.aggregate([
      {
        $group: {
          _id: `$${field}`,
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
};

// Function to handle the filtering
export const handleFilter = async (
  typeFilter?: string[],
  categoryFilter?: string[],
  levelFilter?: string[],
  salaryFilter?: string[],
  page = 1,
  limit = 10
) => {
  try {
    await connectToDatabase();
    // Build the query object based on the provided filters
    const query: any = {};
    if (typeFilter && typeFilter.length > 0) {
      query.type = { $in: typeFilter };
    }
    if (categoryFilter && categoryFilter.length > 0) {
      query["category.name"] = { $in: categoryFilter };
    }
    if (levelFilter && levelFilter.length > 0) {
      query.level = { $in: levelFilter };
    }
    if (salaryFilter && salaryFilter.length > 0) {
      query.salary = { $in: salaryFilter };
    }

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    // Perform the query to filter documents
    const documents = await Jobs.find(query)
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    // Get the total number of jobs
    const jobCount = await Jobs.find(query).countDocuments();
    const totalPages = Math.ceil(jobCount / limit);

    return { jobs: JSON.parse(JSON.stringify(documents)), totalPages };
  } catch (error) {
    handleError(error);
  }
};
