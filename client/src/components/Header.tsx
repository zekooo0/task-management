import { HomeIcon, User } from "lucide-react";

import Link from "next/link";
import Logout from "./Logout";
import { ModeToggle } from "./mode-toggle";
import { cookies } from "next/headers";

export default function Header() {
  const loggedin = cookies().get("accessToken")?.value;

  return (
    <header className="flex justify-between items-center h-20 container">
      <div>
        <Link href={"/"}>
          {" "}
          <HomeIcon />
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <ModeToggle />
        {loggedin ? (
          <div className="flex items-center space-x-2">
            <Logout />
            <Link href={"/profile"}>
              <User />
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </header>
  );
}
