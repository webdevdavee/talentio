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

// export const getJobViews = async (companyId: string) => {
//   try {
//     await connectToDatabase();

//     const startOfWeek = new Date(); // Get the current date
//     startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
//     startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go back to Sunday

//     const endOfWeek = new Date(startOfWeek);
//     endOfWeek.setDate(endOfWeek.getDate() + 7); // Go forward to next Sunday

//     // Rest of the aggregation pipeline remains the same

//     const pipeline = [
//       {
//         $match: {
//           companyId,
//           views: {
//             $elemMatch: { date: { $gte: startOfWeek, $lte: endOfWeek } },
//           },
//         },
//       },
//       {
//         $unwind: "$views",
//       },
//       {
//         $group: {
//           _id: null,
//           totalViews: { $sum: 1 },
//         },
//       },
//     ];

//     const result = await Jobview.aggregate(pipeline);

//     if (result.length > 0) {
//       const totalViewsThisWeek = result[0].totalViews;
//       return totalViewsThisWeek;
//     } else {
//       return 0;
//     }
//   } catch (error: any) {
//     handleError(error);
//   }
// };
