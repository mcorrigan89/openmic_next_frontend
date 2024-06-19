import { serverApi } from "@/api/server/server-api";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function getInitials(givenName: string | null, familyName: string | null) {
  if (!givenName || !familyName) {
    return "";
  }

  return givenName[0] + familyName[0];
}

export async function TopBar() {
  const res = await serverApi().user.me();

  if (res.__typename !== "User") {
    return (
      <div>
        <div className="flex items-center justify-between rounded-full border p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <Link href={"/signup"} className="text-slate-500">
              Sign Up
            </Link>
            <Link href={"/signin"} className="text-slate-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    const initials = getInitials(res.givenName, res.familyName);
    return (
      <div>
        <div className="flex items-center justify-between rounded-full border p-4 shadow-lg">
          <div className="flex items-center space-x-4">
            <p className="text-slate-500">{res.givenName}</p>
            <p className="text-slate-500">{res.familyName}</p>
            <Link href={"/logout"} className="text-slate-500">
              Logout
            </Link>
            <Avatar>
              <AvatarImage
                src={res.avatarUrl ?? undefined}
                referrerPolicy="no-referrer"
                content="no-referrer"
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    );
  }
}
