"use client";

import { Button } from "./ui/button";
import { logout } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();
  const onDelete = async () => {
    const res = await logout();
    if (res === 200) {
      router.push("/signin");
    }
  };

  return <Button onClick={onDelete}>Logout</Button>;
};

export default Logout;
