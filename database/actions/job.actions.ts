"use server";

import { connectToDatabase } from "..";
import {
  capitalizeFirstLetter,
  formatNumberWithCommas,
  handleError,
} from "@/lib/utils";
import Jobs from "../models/job.model";
import { PostJobFormSchema } from "@/lib/zod";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export const createJob = async (
  data: z.infer<typeof PostJobFormSchema>,
  selectedCategory: string,
  radioSelections: {
    jobType: string;
    jobLevel: string;
  },
  company: Company
) => {
  try {
    await connectToDatabase();

    const validatedFields = PostJobFormSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid credentials." };
    }

    const { from, to } = validatedFields.data.salary;

    const jobData = {
      ...data,
      capacity: Number(data.capacity),
      salary: `$${formatNumberWithCommas(from)} - $${formatNumberWithCommas(
        to
      )}`,
      category: selectedCategory,
      type: capitalizeFirstLetter(radioSelections.jobType),
      level: capitalizeFirstLetter(radioSelections.jobLevel),
      company: company.company,
      companylogo: company.logo,
      companyId: company.userId,
      applied: 0,
    };

    const newJob = await Jobs.create(jobData);
    console.log(newJob);
  } catch (error: any) {
    handleError(error);
  }
};

export const getJobs = async (page = 1, limit = 10) => {
  try {
    await connectToDatabase();

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    const jobs = await Jobs.find({})
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    // Get the total number of jobs
    const jobCount = await Jobs.find({}).countDocuments();
    const totalPages = Math.ceil(jobCount / limit);

    const jobsNoLimit = await Jobs.find({});

    return {
      jobs: JSON.parse(JSON.stringify(jobs)),
      totalPages,
      jobsNoLimit: JSON.parse(JSON.stringify(jobsNoLimit)),
    };
  } catch (error) {
    handleError(error);
  }
};

export const getJobById = async (jobId: string) => {
  try {
    await connectToDatabase();
    const job = await Jobs.findById(jobId);
    if (!job) {
      throw new Error("Job not found");
    }
    return JSON.parse(JSON.stringify(job));
  } catch (error: any) {
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
  } catch (error: any) {
    handleError(error);
  }
};

export const getJobsPropertyValueCount = async (field: string) => {
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
  } catch (error: any) {
    handleError(error);
  }
};

// Function to handle the filtering
export const handleJobFilter = async ({
  typeFilter,
  categoryFilter,
  levelFilter,
  salaryFilter,
  search,
  page = 1,
  limit = 10,
}: HandleJobFilter) => {
  try {
    await connectToDatabase();
    // Build the query object based on the provided filters
    const query: any = {};

    if (typeFilter && typeFilter.length > 0) {
      query.type = { $in: typeFilter };
    }
    if (categoryFilter && categoryFilter.length > 0) {
      query.category = { $in: categoryFilter };
    }
    if (levelFilter && levelFilter.length > 0) {
      query.level = { $in: levelFilter };
    }
    if (salaryFilter && salaryFilter.length > 0) {
      query.salary = { $in: salaryFilter };
    }
    if (search && search.length > 0) {
      const [value1, value2] = search;
      // Make a search pattern using special rules that ensure each word is included in the text.
      let jobTitleString = value1.split(/\s+/);
      let pattern = jobTitleString.map((string) => `(?=.*${string})`).join("");

      if (value2) {
        let jobLocationString = value2.split(/\s+/);
        let pattern2 = jobLocationString
          .map((string) => `(?=.*${string})`)
          .join("");

        query.$or = [
          {
            title: {
              $regex: pattern,
              $options: "i",
            },
          },
          {
            location: {
              $regex: pattern2,
              $options: "i",
            },
          },
        ];
      } else {
        query.title = {
          $regex: pattern,
          $options: "i",
        };
      }
    }

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    // Perform the query to filter documents
    const jobs = await Jobs.find(query)
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10)
      .sort("desc");

    const jobsNoLimit = await Jobs.find({});

    // Get the total number of jobs
    const jobCount = await Jobs.find(query).countDocuments();
    const totalPages = Math.ceil(jobCount / limit);

    return {
      jobs: JSON.parse(JSON.stringify(jobs)),
      totalPages,
      jobsNoLimit: JSON.parse(JSON.stringify(jobsNoLimit)),
    };
  } catch (error: any) {
    handleError(error);
  }
};

export const getUniquePropertyValue = async (field: string) => {
  try {
    await connectToDatabase();

    const data = await Jobs.aggregate([
      {
        $group: {
          _id: `$${field}`,
          document: { $first: "$$ROOT" },
        },
      },
      {
        $replaceRoot: { newRoot: "$document" },
      },
      {
        $project: {
          location: 1,
          _id: 0,
        },
      },
    ]);

    return JSON.parse(JSON.stringify(data));
  } catch (error: any) {
    handleError(error);
  }
};

export const getJobsByCompanyId = async (
  companyId: string,
  page = 1,
  limit = 10
) => {
  try {
    await connectToDatabase();

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    const jobs = await Jobs.find({ companyId })
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    // Get the total number of jobs
    const jobCount = await Jobs.find({ companyId }).countDocuments();
    const totalPages = Math.ceil(jobCount / limit);

    return {
      jobs: JSON.parse(JSON.stringify(jobs)),
      totalPages,
    };
  } catch (error: any) {
    handleError(error);
  }
};

export const getJobsCountByCompanyId = async (companyId: string) => {
  try {
    await connectToDatabase();

    // Get the total number of jobs
    const jobCount = await Jobs.find({ companyId }).countDocuments();

    return JSON.parse(JSON.stringify(jobCount ?? 0));
  } catch (error: any) {
    handleError(error);
  }
};

export const getJobsByCompany = async (company: string) => {
  try {
    await connectToDatabase();

    const job = await Jobs.find({ company: company });

    return JSON.parse(JSON.stringify(job));
  } catch (error: any) {
    handleError(error);
  }
};

export const updateJob = async (
  jobId: string,
  field: string,
  fieldData: any
) => {
  try {
    await connectToDatabase();

    const updatedUser = await Jobs.updateOne(
      { _id: jobId },
      { $set: { [field]: fieldData } }
    );

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

export const deleteJobs = async (jobs: { id: string }[], path: string) => {
  try {
    await connectToDatabase();

    // Construct an array of ids from jobs
    const idsToDelete = jobs.map((job) => job.id);

    // Perform the deletion
    await Jobs.deleteMany({
      _id: { $in: idsToDelete },
    });

    revalidatePath(path);
  } catch (error: any) {
    handleError(error);
  }
};

export const getCompanyJobsAppliedCount = async (companyId: string) => {
  const startOfWeek = new Date(); // Get the current date
  startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go back to Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // Go forward 6 days to Saturday

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7); // Go back 7 days to the start of last week

  const endOfLastWeek = new Date(startOfWeek);
  endOfLastWeek.setDate(endOfLastWeek.getDate() - 1); // Go back 1 day from the start of the current week to get to the end of last week

  const thisWeekPipeline = [
    {
      $match: {
        companyId,
        createdAt: {
          $gte: startOfWeek,
          $lte: new Date(), // Use current date for this week
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAppliedThisWeek: { $sum: "$applied" },
      },
    },
  ];

  const lastWeekPipeline = [
    {
      $match: {
        companyId,
        createdAt: {
          $gte: startOfLastWeek,
          $lte: endOfLastWeek, // Use end of last week for range
        },
      },
    },
    {
      $group: {
        _id: null,
        totalAppliedLastWeek: { $sum: "$applied" },
      },
    },
  ];

  try {
    await connectToDatabase();

    const [thisWeekResult, lastWeekResult] = await Promise.all([
      Jobs.aggregate(thisWeekPipeline),
      Jobs.aggregate(lastWeekPipeline),
    ]);

    const totalAppliedThisWeek =
      thisWeekResult.length > 0
        ? thisWeekResult[0].totalAppliedThisWeek || 0
        : 0;
    const totalAppliedLastWeek =
      lastWeekResult.length > 0
        ? lastWeekResult[0].totalAppliedLastWeek || 0
        : 0;

    // Calculate percentage change (handle division by zero)
    const percentageChange =
      totalAppliedLastWeek === 0
        ? 100 // Handle division by zero
        : Number(
            (
              ((totalAppliedThisWeek - totalAppliedLastWeek) /
                totalAppliedLastWeek) *
              100
            ).toFixed(2)
          );

    return { totalAppliedThisWeek, percentageChange };
  } catch (error: any) {
    handleError(error);
  }
};
