"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Pageview from "../models/pageview.model";

export const getPageViews = async (companyId: string) => {
  try {
    await connectToDatabase();

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const companyPage = await Pageview.findOne({ companyId });
    const weeklyViews = companyPage.views.filter(
      (view: any) => view.date > oneWeekAgo
    );

    return JSON.parse(JSON.stringify(weeklyViews.length)); // This is the number of views in the last week
  } catch (error: any) {
    handleError(error);
  }
};

export const incrementPageView = async (companyId: string) => {
  try {
    await connectToDatabase();

    const update = {
      $push: { views: { date: new Date() } },
      $inc: { viewCount: 1 },
    };

    const options = { upsert: true, new: true };

    await Pageview.findOneAndUpdate({ companyId: companyId }, update, options);
  } catch (error: any) {
    handleError(error);
  }
};
