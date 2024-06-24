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
        thisWeekViews: thisWeekViews.length,
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
            $lte: new Date(`${currentYear + 1}-01-01`),
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

    return { months, viewsCount };
  } catch (error) {
    handleError(error);
  }
};

export const getJobViewsByWeekDays = async (
  companyId: string,
  customStartDate?: Date
) => {
  customStartDate?.setHours(customStartDate?.getHours() + 1); // Adjust for timezone difference

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Go back to Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6); // Go forward 6 days to Saturday

  try {
    await connectToDatabase();

    const companyJobPage = await Jobview.findOne({ companyId });

    if (companyJobPage) {
      const viewsByDay = new Map<string, number>(); // Map to store views by day

      // Initialize views count for each day
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(
          customStartDate ? customStartDate : startOfWeek
        );
        currentDate.setDate(currentDate.getDate() + i);
        viewsByDay.set(currentDate.toISOString().slice(0, 10), 0);
      }

      // Update views count based on actual data
      companyJobPage.views?.forEach((view: any) => {
        const viewDate = view.date.toISOString().slice(0, 10);
        if (viewsByDay.has(viewDate)) {
          viewsByDay.set(viewDate, viewsByDay.get(viewDate)! + 1);
        }
      });

      // Convert map to an array of objects
      const result = Array.from(viewsByDay, ([date, count]) => ({
        date,
        count,
      }));

      return result;
    } else {
      return [];
    }
  } catch (error: any) {
    handleError(error);
    return [];
  }
};
