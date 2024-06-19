import { createTRPCRouter, publicProcedure } from "@/api/server/trpc";
import { z } from "zod";

export const userRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    const response = await ctx.gqlClient.user.getMe();

    return response.me;
  }),
  authenticateWithPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.gqlClient.user.authenticateWithPassword({
        email: input.email,
        password: input.password,
      });

      return response.authenticateWithPassword;
    }),

  authenticateWithGoogleCode: publicProcedure
    .input(
      z.object({
        code: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.gqlClient.user.authenticateWithGoogleCode({
        code: input.code,
      });

      return response.authenticateWithGoogleCode;
    }),
});
