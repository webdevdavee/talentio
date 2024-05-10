import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema({
  company: { type: String, required: true },
  about: { type: String, required: true },
  logo: { type: String, required: true },
  category: [{ type: String, required: true }],
});

const Companies = models.Companies || model("Companies", CompanySchema);

export default Companies;
