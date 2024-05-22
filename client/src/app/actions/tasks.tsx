"use server";

import axios, { AxiosResponse } from "axios";

import { ITask } from "@/interfaces";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const tasks = await axios.get("http://localhost:3001/tasks", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    revalidatePath("/");
    return tasks.data;
  } catch (err) {
    console.log(err);
  }
}

export async function createTask(data: ITask) {
  const accessToken = cookies().get("accessToken")?.value;

  const tasks = await axios.post("http://localhost:3001/tasks", data, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  revalidatePath("/");

  return tasks.data;
}

export async function deleteTask(id: string) {
  const accessToken = cookies().get("accessToken")?.value;

  const tasks = await axios.delete(`http://localhost:3001/tasks/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  revalidatePath("/");

  return tasks.data;
}

export async function updateTask(data: ITask, id: string) {
  const accessToken = cookies().get("accessToken")?.value;

  const tasks = await axios.patch(
    `http://localhost:3001/tasks/${id}/status`,
    data,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  revalidatePath("/");

  return tasks.data;
}
