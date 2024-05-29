import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    photo: { type: String },
    applications: [
      {
        title: { type: String, required: true },
        type: { type: String, required: true },
        location: { type: String, required: true },
        level: { type: String, required: true },
        salary: { type: String, required: true },
        company: { type: String, required: true },
      },
    ],
    savedJobs: [
      {
        title: { type: String, required: true },
        type: { type: String, required: true },
        location: { type: String, required: true },
        level: { type: String, required: true },
        salary: { type: String, required: true },
        company: { type: String, required: true },
      },
    ],
    role: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

const Users = models.Users || model("Users", UserSchema);

export default Users;
