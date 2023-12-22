"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";

import { connectToDB } from "../mongoose";


interface Params {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  // path: string;
}


export async function createUser({
  id,
  email,
  firstName,
  lastName,
  password,
  // path,
}: Params) {
  try {
    connectToDB();
    console.log("jo");

    const createdUser = await User.create(
      {
        id,
        email,
        firstName,
        lastName,
        password,
      },
    );
    console.log(createdUser);

    // revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create user: \n ${error.message}`);
  }
}


export async function updateUser({
  id,
  email,
  firstName,
  lastName,
  password,
  // path
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id },
      {
        email,
        firstName,
        lastName,
        password,
      },
      { upsert: true }
    );

    // revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function setDarkMode({
  id,
  darkMode,
  path,
}: {
  id: string;
  darkMode: boolean;
  path: string;
}): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: id },
      {
        darkMode,
      },
      { upsert: true }
    );

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to set todo done: ${error.message}`);
  }
}