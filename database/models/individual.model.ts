import { Schema, model, models } from "mongoose";

const IndividualSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String },
    image: { type: String },
    accountType: { type: String, required: true },
    securityQuestion: { question: { type: String }, answer: { type: String } },
    provider: { type: String },
  },
  { timestamps: true }
);

const Individual = models.Individual || model("Individual", IndividualSchema);

export default Individual;
