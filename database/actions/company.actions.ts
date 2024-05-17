"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Companies from "../models/company.model";

export const getCompanies = async (page = 1, limit = 10) => {
  try {
    await connectToDatabase();

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    const companies = await Companies.find({})
      .find({})
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    // Get the total number of companies
    const companiesCount = await Companies.find({}).countDocuments();
    const totalPages = Math.ceil(companiesCount / limit);

    const companiesNoLimit = await Companies.find({});

    return {
      companies: JSON.parse(JSON.stringify(companies)),
      totalPages,
      companiesNoLimit,
    };
  } catch (error) {
    handleError(error);
  }
};

export const getCompanyById = async (companyId: string) => {
  try {
    await connectToDatabase();
    const company = await Companies.findById(companyId);
    if (!company) {
      throw new Error("Company not found");
    }
    return JSON.parse(JSON.stringify(company));
  } catch (error) {
    handleError(error);
  }
};

export const getCompanyByName = async (companyName: string) => {
  try {
    await connectToDatabase();
    const company = await Companies.find({ company: companyName });
    if (!company) {
      throw new Error("Company not found");
    }
    return JSON.parse(JSON.stringify(company));
  } catch (error) {
    handleError(error);
  }
};

export const getCompaniesByIndustry = async (industry: string) => {
  try {
    await connectToDatabase();

    const companies = await Companies.find({ industry: { $in: [industry] } });

    console.log(companies);

    return JSON.parse(JSON.stringify(companies));
  } catch (error) {
    handleError(error);
  }
};

export const getArrayPropertyValuesFrequency = async (arrayField: string) => {
  try {
    await connectToDatabase();

    const result = await Companies.aggregate([
      { $unwind: `$${arrayField}` },
      {
        $group: {
          _id: `$${arrayField}`,
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    handleError(error);
  }
};

export const handleCompanyFilter = async (
  industryFilter: string[],
  search?: string[],
  page = 1,
  limit = 10
) => {
  try {
    await connectToDatabase();

    // Build the query object based on the provided filters
    const query: any = {};

    if (industryFilter && industryFilter.length > 0) {
      query.industry = { $in: industryFilter };
    }

    if (search && search.length > 0) {
      const [value1] = search;

      // Make a search pattern using special rules that ensure each word is included in the text.
      let companyNameString = value1.split(/\s+/);
      let pattern = companyNameString
        .map((string) => `(?=.*${string})`)
        .join("");

      query.$or = [
        {
          company: {
            $regex: pattern,
            $options: "i",
          },
        },
        {
          industry: {
            $regex: pattern,
            $options: "i",
          },
        },
      ];
    }

    // Calculate the number of documents to skip
    const skips = limit * (page - 1);

    // Perform the query to filter documents
    const companies = await Companies.find(query)
      .skip(skips >= 0 ? skips : 0)
      .limit(limit > 0 ? limit : 10);

    const companiesNoLimit = await Companies.find({});

    // Get the total number of companies
    const companiesCount = await Companies.find(query).countDocuments();
    const totalPages = Math.ceil(companiesCount / limit);

    return {
      companies: JSON.parse(JSON.stringify(companies)),
      totalPages,
      companiesNoLimit,
    };
  } catch (error) {
    handleError(error);
  }
};
