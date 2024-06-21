"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Jobview from "../models/jobview.model";

export const getJobViews = async (companyId: string) => {
  const startOfWeek = new Date(); // Get the current date
  startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go back to Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // Go forward 6 days to Saturday

  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7); // Go back 7 days to the start of last week

  const endOfLastWeek = new Date(startOfWeek);
  endOfLastWeek.setDate(endOfLastWeek.getDate() - 1); // Go back 1 day from the start of the current week to get to the end of last week

  try {
    await connectToDatabase();

    const companyJobPage = await Jobview.findOne({ companyId });

    if (companyJobPage) {
      const thisWeekViews = companyJobPage.views?.filter(
        (view: any) => view.date > startOfWeek && view.date < endOfWeek
      );

      const lastWeekViews = companyJobPage.views?.filter(
        (view: any) => view.date > startOfLastWeek && view.date < endOfLastWeek
      );

      // Calculate percentage change (handle division by zero)
      const percentageChange =
        lastWeekViews.length === 0
          ? 100 // Handle division by zero
          : Number(
              (
                ((thisWeekViews.length - lastWeekViews.length) /
                  lastWeekViews.length) *
                100
              ).toFixed(2)
            );

      return {
        thisWeekViews: thisWeekViews.length || 0,
        percentageChange: percentageChange > 100 ? 100 : percentageChange,
      };
    } else {
      return { thisWeekViews: 0, percentageChange: 0 };
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const incrementJobView = async (companyId: string) => {
  try {
    await connectToDatabase();

    const update = {
      $push: { views: { date: new Date() } },
      $inc: { viewCount: 1 },
    };

    const options = { upsert: true, new: true };

    await Jobview.findOneAndUpdate({ companyId }, update, options);
  } catch (error: any) {
    handleError(error);
  }
};

// Get the total number of views made in each month
export const getEachMonthViewsCount = async (
  companyId: string,
  year?: number
) => {
  try {
    await connectToDatabase();

    // Get the current year
    const currentYear = year
      ? new Date().getFullYear() - year
      : new Date().getFullYear();

    // Initialize an array of months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Initialize an array to store views count
    const viewsCount = new Array(12).fill(0);

    // Aggregate views by month
    const aggregationPipeline = [
      {
        $match: {
          companyId,
          "views.date": {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $unwind: "$views",
      },
      {
        $group: {
          _id: { $month: "$views.date" },
          count: { $sum: 1 },
        },
      },
    ];

    const result = await Jobview.aggregate(aggregationPipeline);

    // Update viewsCount array
    result.forEach((entry) => {
      const monthIndex = entry._id - 1;
      viewsCount[monthIndex] = entry.count;
    });

    console.log(months, viewsCount);
    return { months, viewsCount };
  } catch (error) {
    handleError(error);
  }
};
