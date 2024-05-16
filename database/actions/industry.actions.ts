"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Industries from "../models/industry.model";

export const getIndustries = async () => {
  try {
    await connectToDatabase();

    const industries = await Industries.find({});

    return JSON.parse(JSON.stringify(industries));
  } catch (error) {
    handleError(error);
  }
};
