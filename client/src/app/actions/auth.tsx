"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function login(data: { email: string; password: string }) {
  try {
    const user = await axios.post("http://localhost:3001/auth/signin", data);

    cookies().set("accessToken", user.data.accessToken);
    return user.data;
  } catch (err: any) {
    return err.response.data.statusCode;
  }
}
