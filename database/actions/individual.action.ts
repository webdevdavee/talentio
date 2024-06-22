"use server";

import { connectToDatabase } from "..";
import { handleError } from "@/lib/utils";
import Individual from "../models/individual.model";
import Users from "../models/users.model";
import { AuthSignUpFormSchema } from "@/lib/zod/authZod";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { SettingsFormSchema } from "@/lib/zod";

export const createUser = async (
  data: z.infer<typeof AuthSignUpFormSchema>
) => {
  try {
    await connectToDatabase();

    const validatedFields = AuthSignUpFormSchema.safeParse(data);
    if (!validatedFields.success) {
      return { error: "Invalid credentials." };
    }

    const { name, email, password } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 7);

    // Check for duplicate email or name
    const existingUser = await Users.findOne({
      $or: [{ email: email }, { name: name }],
    });

    if (existingUser) {
      return { error: "Username or email already in use." };
    }

    const user = {
      userId: uuidv4(),
      name,
      email,
      password: hashedPassword,
      image: "/images/default-avatar.webp",
      accountType: "individual",
      provider: "credentials",
    };

    // Save user in all users collection and individual collection
    await Promise.all([Users.create(user), Individual.create(user)]);

    console.log("User created!");
  } catch (error: any) {
    handleError(error);
  }
};

export const findIndividualById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await Individual.findOne({ userId });

    if (!user) throw new Error("No user found.");

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    handleError(error);
  }
};

export const OauthUserLogin = async (user: any) => {
  try {
    await connectToDatabase();

    const existingUser = await Users.findOne({ email: user.email });

    if (existingUser) {
      return { error: "Email already in use." };
    }

    const newUser = {
      ...user,
      userId: uuidv4(),
      accountType: "individual",
    };

    // Save user in all users collection and individual collection
    await Promise.all([Users.create(newUser), Individual.create(newUser)]);
  } catch (error: any) {
    handleError(error);
  }
};

export const updateUserField = async ({
  userId,
  field,
  fieldData,
}: updateUserFieldParams) => {
  if (!fieldData) {
    return { error: "Invalid field." };
  }

  await connectToDatabase();
  try {
    // Save user in all users collection and individual collection
    const updatedUser = await Promise.all([
      Individual.updateOne({ userId }, { $set: { [field]: fieldData } }),
      Users.updateOne({ userId }, { $set: { [field]: fieldData } }),
    ]);

    // Check if all updates were acknowledged
    if (updatedUser.some((result) => !result.acknowledged)) {
      return { error: "An error occurred!." };
    } else {
      return { success: "Reset successful! Taking you back to log in." };
    }
  } catch (error: any) {
    handleError(error);
  }
};

export const updateIndividual = async (
  data: z.infer<typeof SettingsFormSchema>,
  user: User
) => {
  const validatedFields = SettingsFormSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid credentials." };
  }

  let hashedPassword: string | undefined;

  if (data.currentPassword && data.newPassord && data.confirmPassword) {
    const passwordMatch = await bcrypt.compare(
      data.currentPassword as string,
      user.password as string
    );

    if (!passwordMatch)
      return { error: "Current password does not match user password." };

    if (data.newPassord === data.confirmPassword) {
      // Hash new password
      hashedPassword = await bcrypt.hash(data.confirmPassword as string, 7);
    } else {
      return { error: "Passwords do not match." };
    }
  }

  try {
    await connectToDatabase();

    // Fields to update
    const updateFields: {
      name: string | undefined;
      email: string | undefined;
      password: string | undefined;
      image: string | undefined;
    } = {
      name: data.name,
      email: data.email,
      password: hashedPassword ? hashedPassword : user.password,
      image: data.image,
    };

    // Save user in all users collection and individual collection
    const updatedUser = await Promise.all([
      Individual.updateOne({ userId: user.userId }, { $set: updateFields }),
      Users.updateOne({ userId: user.userId }, { $set: updateFields }),
    ]);

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};
