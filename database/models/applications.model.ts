import { Schema, model, models } from "mongoose";

const ApplicationsSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true },
    level: { type: String, required: true },
    salary: { type: String, required: true },
    company: { type: String, required: true },
    companylogo: { type: String, required: true },
  },
  { timestamps: true }
);

const Applications =
  models.Applications || model("Applications", ApplicationsSchema);

export default Applications;
