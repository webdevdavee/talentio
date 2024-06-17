import { Schema, model, models } from "mongoose";

const PageViewsSchema = new Schema(
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

const Pageview = models.Pageview || model("Pageview", PageViewsSchema);

export default Pageview;
