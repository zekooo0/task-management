import axios, { AxiosResponse } from "axios";

import { cookies } from "next/headers";

export async function getTasks() {
  const accessToken = cookies().get("accessToken")?.value;
  const tasks = await axios.get("http://localhost:3001/tasks", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return tasks.data;
}
