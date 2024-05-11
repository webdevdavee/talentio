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
  } catch (error) {
    handleError(error);
  }
};

// Function to handle the filtering
export const handleJobFilter = async (
  typeFilter?: string[],
  categoryFilter?: string[],
  levelFilter?: string[],
  salaryFilter?: string[],
  search?: string[],
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
    if (search && search.length > 0) {
      const [value1, value2] = search;
      // Make a search pattern using special rules that ensure each word is included in the text.
      let jobTitleString = value1.split(/\s+/);
      let pattern = jobTitleString.map((string) => `(?=.*${string})`).join("");

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
    }

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    // Perform the query to filter documents
    const jobs = await Jobs.find(query)
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    const jobsNoLimit = await Jobs.find({});

    // Get the total number of jobs
    const jobCount = await Jobs.find(query).countDocuments();
    const totalPages = Math.ceil(jobCount / limit);

    return { jobs: JSON.parse(JSON.stringify(jobs)), totalPages, jobsNoLimit };
  } catch (error) {
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
  } catch (error) {
    handleError(error);
  }
};

// export const searchJobFromInput = async (
//   jobTitle: string,
//   jobLocation: string,
//   page = 1,
//   limit = 10
// ) => {
//   try {
//     await connectToDatabase();

//     // Make a search pattern using special rules that ensure each word you’re looking for is included in the text.
//     let jobTitleString = jobTitle.split(/\s+/);
//     let pattern = jobTitleString.map((string) => `(?=.*${string})`).join("");

//     let jobLocationString = jobLocation.split(/\s+/);
//     let pattern2 = jobLocationString
//       .map((string) => `(?=.*${string})`)
//       .join("");

//     // Calculate the number of documents to skip
//     const skips = limit * (page - 1);

//     const query = {
//       $or: [
//         {
//           title: {
//             $regex: pattern,
//             $options: "i",
//           },
//         },
//         {
//           location: {
//             $regex: pattern2,
//             $options: "i",
//           },
//         },
//       ],
//     };

//     const jobs = await Jobs.find(query)
//       .skip(skips >= 0 ? skips : 0)
//       .limit(limit > 0 ? limit : 10);

//     // Get the total number of jobs
//     const jobCount = await Jobs.find(query).countDocuments();
//     const totalPages = Math.ceil(jobCount / limit);

//     return { jobs: JSON.parse(JSON.stringify(jobs)), totalPages };
//   } catch (error) {
//     handleError(error);
//   }
// };
