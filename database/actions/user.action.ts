"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Users from "../models/user.model";
import * as bcrypt from "bcrypt";

export const createUser = async (user: CreateUserParam) => {
  try {
    await connectToDatabase();

    // Check for duplicate email or username
    const existingUser = await Users.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });

    if (existingUser) {
      throw new Error("Username or email already in use.");
    }

    const hashedPassword = await bcrypt.hash(user.password, 11);
    user.password = hashedPassword;

    const newUser = await Users.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    handleError(error);
  }
};

export const findUser = async ({ username, email }: FindUserParam) => {
  try {
    await connectToDatabase();
    const query: any = {};

    if (username && username) {
      query.username = username;
    }

    if (email && email) {
      query.email = email;
    }

    const user = await Users.findOne(query);

    if (!user) throw new Error("User not found.");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};
