"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Categories from "../models/category.model";

export const getCategories = async () => {
  try {
    await connectToDatabase();

    const categories = await Categories.find({});

    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    handleError(error);
  }
};
