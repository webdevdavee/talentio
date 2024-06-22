import { Schema, model, models } from "mongoose";

const JobViewsSchema = new Schema(
  {
    companyId: { type: String, required: true },
    viewCount: {
      type: Number,
      default: 0,
    },
    views: [
      {
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Jobview = models.Jobview || model("Jobview", JobViewsSchema);

export default Jobview;

// I want you to rewrite this function to return the number of views for each day of the current week starting from Sunday to Saturday, in the current month. Return 0 is a day has no views.

// export const getJobViews = async (companyId: string) => {
//   const startOfWeek = new Date(); // Get the current date
//   startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight
//   startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Go back to Sunday

//   const endOfWeek = new Date(startOfWeek);
//   endOfWeek.setDate(endOfWeek.getDate() + 6); // Go forward 6 days to Saturday

//   const startOfLastWeek = new Date(startOfWeek);
//   startOfLastWeek.setDate(startOfLastWeek.getDate() - 7); // Go back 7 days to the start of last week

//   const endOfLastWeek = new Date(startOfWeek);
//   endOfLastWeek.setDate(endOfLastWeek.getDate() - 1); // Go back 1 day from the start of the current week to get to the end of last week

//   try {
//     await connectToDatabase();

//     const companyJobPage = await Jobview.findOne({ companyId });

//     if (companyJobPage) {
//       const thisWeekViews = companyJobPage.views?.filter(
//         (view: any) => view.date > startOfWeek && view.date < endOfWeek
//       );

//       const lastWeekViews = companyJobPage.views?.filter(
//         (view: any) => view.date > startOfLastWeek && view.date < endOfLastWeek
//       );

//       // Calculate percentage change (handle division by zero)
//       const percentageChange =
//         lastWeekViews.length === 0
//           ? 100 // Handle division by zero
//           : Number(
//               (
//                 ((thisWeekViews.length - lastWeekViews.length) /
//                   lastWeekViews.length) *
//                 100
//               ).toFixed(2)
//             );

//       return {
//         thisWeekViews: thisWeekViews.length || 0,
//         percentageChange: percentageChange > 100 ? 100 : percentageChange,
//       };
//     } else {
//       return { thisWeekViews: 0, percentageChange: 0 };
//     }
//   } catch (error: any) {
//     handleError(error);
//   }
// };

// This is my mongodb schema

// const JobViewsSchema = new Schema(
//   {
//     companyId: { type: String, required: true },
//     viewCount: {
//       type: Number,
//       default: 0,
//     },
//     views: [
//       {
//         date: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );
