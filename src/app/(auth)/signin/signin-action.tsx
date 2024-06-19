"use server";

import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { signinSchema } from "./signin-schema";
import { serverApi } from "@/api/server/server-api";
import { cookies } from "next/headers";

export async function signin(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: signinSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await serverApi().user.authenticateWithPassword({
    email: submission.value.email,
    password: submission.value.password,
  });

  const c = cookies();

  if (response.__typename === "UserSession") {
    response.token;

    c.set("x-session-token", response.token, {
      secure: true,
      sameSite: "lax",
    });

    redirect("/");
  } else {
    if (response.__typename === "UserNotFound") {
      return submission.reply({
        resetForm: false,
        formErrors: ["No user found with that email."],
      });
    } else if (response.__typename === "InvalidCredentials") {
      return submission.reply({
        resetForm: false,
        formErrors: ["Incorrect Password."],
      });
    } else {
      return submission.reply({
        resetForm: false,
        formErrors: ["Error"],
      });
    }
  }
}
