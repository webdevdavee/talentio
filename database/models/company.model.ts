import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema({
  company: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  about: { type: String, required: true },
  logo: { type: String, required: true },
  accountType: { type: String },
  securityQuestion: { question: { type: String }, answer: { type: String } },
  industry: [{ type: String, required: true }],
  company_size: { type: String, required: true },
  contact: [{ type: String, required: true }],
});

const Companies = models.Companies || model("Companies", CompanySchema);

export default Companies;
