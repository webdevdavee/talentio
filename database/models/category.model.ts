import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  category: { type: String, required: true },
  icon: { type: String, required: true },
});

const Categories = models.Categories || model("Categories", CategorySchema);

export default Categories;
