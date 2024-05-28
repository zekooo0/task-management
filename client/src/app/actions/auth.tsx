"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function login(data: { email: string; password: string }) {
  try {
    const user = await axios.post(
      "https://task-management-sqhb.onrender.com/auth/signin",
      data
    );

    cookies().set("accessToken", user.data.accessToken);
    return 200;
  } catch (err: any) {
    console.log(err);

    return err.response.statusText;
  }
}

export async function signup(data: {
  username: string;
  email: string;
  password: string;
  linkedinUrl: string;
}) {
  try {
    const user = await axios.post(
      "https://task-management-sqhb.onrender.com/auth/signup",
      data
    );

    return 201;
  } catch (err: any) {
    console.log(err);
    return err.response.statusText;
  }
}

export async function logout() {
  try {
    cookies().delete("accessToken");
    return 200;
  } catch (err: any) {
    console.log(err);

    return err.response.statusText;
  }
}
