import { z } from "zod";

export const signinSchema = z.object({
  email: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Email is required" }).email("Email is invalid"),
  ),
  password: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({ required_error: "Password is required" })
      .min(3, "Password is too short"),
  ),
});
