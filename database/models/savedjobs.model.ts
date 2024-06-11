import { Schema, model, models } from "mongoose";

const SavedJobsSchema = new Schema(
  {
    userId: { type: String, required: true },
    jobId: { type: String, required: true },
  },
  { timestamps: true }
);

const SavedJobs = models.SavedJobs || model("SavedJobs", SavedJobsSchema);

export default SavedJobs;
