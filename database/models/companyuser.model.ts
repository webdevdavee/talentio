import { Schema, model, models } from "mongoose";

const CompanyUserSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String },
    companyId: { type: String, required: true },
    image: { type: String },
    accountType: { type: String, required: true },
    securityQuestion: { question: { type: String }, answer: { type: String } },
    provider: { type: String },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const CompanyUser =
  models.CompanyUser || model("CompanyUser", CompanyUserSchema);

export default CompanyUser;
