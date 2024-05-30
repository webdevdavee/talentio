import { Schema, model, models } from "mongoose";

const JobSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  level: { type: String, required: true },
  salary: { type: String, required: true },
  company: { type: String, required: true },
});

const UserSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true, unique: true },
    email: { type: String, trim: true, lowercase: true, unique: true },
    password: { type: String, minlength: 8 },
    photo: { type: String },
    applications: [JobSchema],
    savedJobs: [JobSchema],
    accountType: { type: String },
    email_verified: { type: Boolean },
  },
  { timestamps: true }
);

const Users = models.Users || model("Users", UserSchema);

export default Users;
