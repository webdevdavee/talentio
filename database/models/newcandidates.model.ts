import { Schema, model, models } from "mongoose";

// The new candidates collection is used to hold the applications the company or hiring team has not yet reviewed or seen

const NewCandidateSchema = new Schema(
  {
    applicationId: { type: String, required: true },
    companyId: { type: String, required: true },
  },
  { timestamps: true }
);

const Newcandidate =
  models.Newcandidate || model("Newcandidate", NewCandidateSchema);

export default Newcandidate;
