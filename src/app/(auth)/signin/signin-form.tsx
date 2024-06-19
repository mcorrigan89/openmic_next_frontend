"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { signin } from "./signin-action";
import { signinSchema } from "./signin-schema";
import { env } from "@/env";

const getGoogleAuthUrl = (): string => {
  const params = new URLSearchParams();
  params.append("scope", "openid profile email");
  params.append("access_type", "offline");
  params.append("include_granted_scopes", "true");
  params.append("response_type", "code");
  params.append(
    "redirect_uri",
    `${env.NEXT_PUBLIC_CLIENT_URL}/callback/google`,
  );
  params.append("client_id", env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
};

export function SigninForm() {
  const [lastResult, action] = useFormState(signin, undefined);
  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signinSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const googleUrl = getGoogleAuthUrl();

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your email below to sign in to your account.
        </CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              key={fields.email.key}
              name={fields.email.name}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              key={fields.password.key}
              name={fields.password.name}
            />
            {form.errors?.map((error) => <div key={error}>{error}</div>)}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign in</Button>
          <Button asChild className="w-full">
            <a href={googleUrl}>Sign in with Google</a>
          </Button>
        </CardFooter>
      </form>
      <CardContent>
        <div className="text-center text-sm">
          No account?{" "}
          <Link href="/signup" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
