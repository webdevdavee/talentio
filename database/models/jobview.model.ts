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
