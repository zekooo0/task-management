import axios from "axios";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getProfile() {
  try {
    const accessToken = cookies().get("accessToken")?.value;
    const profile = await axios.get("http://localhost:3001/in/profile", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    revalidatePath("/");
    return profile.data;
  } catch (err) {
    console.log(err);
  }
}
