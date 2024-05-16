import { Schema, model, models } from "mongoose";

const IndustrySchema = new Schema({
  industry: { type: String, required: true },
  icon: { type: String, required: true },
});

const Industries = models.Industries || model("Industries", IndustrySchema);

export default Industries;
