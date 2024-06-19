import { serverApi } from "@/api/server/server-api";
import { cookies } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

const googleCallbackSchema = z.object({
  code: z.string(),
  scope: z.string(),
  authuser: z.string(),
  prompt: z.string(),
});

export async function GET(request: NextRequest) {
  const [, searchParams] = request.url.split("?");
  const paramString = new URLSearchParams(searchParams);
  const params = googleCallbackSchema.parse(Object.fromEntries(paramString));

  const response = await serverApi().user.authenticateWithGoogleCode({
    code: params.code,
  });

  if (response.__typename === "UserSession") {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    const res = NextResponse.redirect(url.toString());

    res.cookies.set("x-session-token", response.token, {
      secure: true,
      sameSite: "lax",
    });

    return res;
  } else {
    return redirect("/signin");
  }
}
