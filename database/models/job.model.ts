import { Schema, model, models } from "mongoose";

const JobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String, required: true },
    level: { type: String, required: true },
    salary: { type: String, required: true },
    company: { type: String, required: true },
    capacity: { type: Number, required: true },
    applied: { type: Number, required: true },
    companylogo: { type: String, required: true },
    companyId: { type: String, required: true },
  },
  { timestamps: true }
);

const Jobs = models.Jobs || model("Jobs", JobSchema);

export default Jobs;
