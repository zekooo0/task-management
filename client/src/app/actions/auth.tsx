"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function login(data: { email: string; password: string }) {
  try {
    const user = await axios.post("http://localhost:3001/auth/signin", data);

    cookies().set("accessToken", user.data.accessToken);
    return 200;
  } catch (err: any) {
    return err.response.data.statusCode;
  }
}

export async function signup(data: {
  username: string;
  email: string;
  password: string;
  linkedinUrl: string;
}) {
  try {
    const user = await axios.post("http://localhost:3001/auth/signup", data);

    return 201;
  } catch (err: any) {
    return err.response.data.statusCode;
  }
}

export async function logout() {
  try {
    cookies().delete("accessToken");
    return 200;
  } catch (err: any) {
    return err;
  }
}
