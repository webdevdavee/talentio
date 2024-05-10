"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Companies from "../models/company.model";

export const getCompanies = async () => {
  try {
    await connectToDatabase();

    const companies = await Companies.find({});

    return JSON.parse(JSON.stringify(companies));
  } catch (error) {
    handleError(error);
  }
};

export const getCompaniesByCategory = async (category: string) => {
  try {
    await connectToDatabase();

    const companies = await Companies.find({ category: { $in: [category] } });

    return JSON.parse(JSON.stringify(companies));
  } catch (error) {
    handleError(error);
  }
};
