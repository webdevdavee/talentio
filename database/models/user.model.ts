import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String },
    image: { type: String },
    accountType: { type: String },
    emailVerified: { type: Boolean },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
