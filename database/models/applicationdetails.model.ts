import { Schema, model, models } from "mongoose";

const ApplicationDetailsSchema = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    nationality: { type: String, required: true },
    coverletter: { type: String, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const ApplicationDetails =
  models.ApplicationDetails ||
  model("ApplicationDetails", ApplicationDetailsSchema);

export default ApplicationDetails;
