import { Schema, model, models } from "mongoose";

const ApplicationsSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nationality: { type: String, required: true },
    coverletter: { type: String, required: true },
    resume: { type: String, required: true },
    jobId: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Applications =
  models.Applications || model("Applications", ApplicationsSchema);

export default Applications;
