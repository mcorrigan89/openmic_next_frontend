import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { cookies } from "next/headers";
import { GQLClient } from "../graphql/client";
import { env } from "@/env";

export interface Context {
  isServer: boolean;
  gqlClient: GQLClient;
  sessionToken?: string;
}

export const createTRPCContext = ({
  isServer,
}: {
  isServer: boolean;
}): Context => {
  const c = cookies();
  const client = new GQLClient(env.NEXT_PUBLIC_SERVER_URL);
  const sessionToken = c.get("x-session-token");

  if (sessionToken?.value) {
    client.setToken(sessionToken.value);
  }

  return {
    gqlClient: client,
    sessionToken: sessionToken?.value,
    isServer,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;
export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;

const procedure = t.procedure;

export const publicProcedure = procedure;
export const privateProcedure = procedure;
