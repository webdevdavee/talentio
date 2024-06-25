import { Schema, model, models } from "mongoose";

const UsersSchema = new Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: { type: String },
    password: { type: String },
    accountType: { type: String },
    securityQuestion: { question: { type: String }, answer: { type: String } },
    provider: { type: String },
  },
  { timestamps: true }
);

const Users = models.Users || model("Users", UsersSchema);

export default Users;
