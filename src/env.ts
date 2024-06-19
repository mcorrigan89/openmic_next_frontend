import { z } from "zod";

/**
 * Specify your server-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars.
 */
const server = z.object({
  NEXT_PUBLIC_CLIENT_URL: z.string().url(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

/**
 * Specify your client-side environment variables schema here. This way you can ensure the app isn't
 * built with invalid env vars. To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
const client = z.object({
  NEXT_PUBLIC_CLIENT_URL: z.string().url(),
  NEXT_PUBLIC_SERVER_URL: z.string().url(),
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: z.string(),
  NODE_ENV: z.enum(["development", "test", "production"]),
});

const processEnv = {
  NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
  NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
  NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  NODE_ENV: process.env.NODE_ENV,
};

const merged = server.merge(client);

type MergedInput = z.input<typeof merged>;
type MergedOutput = z.infer<typeof merged>;
type MergedSafeParseReturn = z.SafeParseReturnType<MergedInput, MergedOutput>;

let env = process.env as MergedOutput;

if (!!process.env.SKIP_ENV_VALIDATION == false) {
  const isServer = typeof window === "undefined";

  const parsed: MergedSafeParseReturn = isServer
    ? merged.safeParse(processEnv) // on server we can validate all env vars
    : client.safeParse(processEnv); // on client we can only validate the ones that are exposed

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );
    throw new Error("Invalid environment variables");
  }

  env = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== "string") return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
        throw new Error(
          process.env.NODE_ENV === "production"
            ? "❌ Attempted to access a server-side environment variable on the client"
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
        );
      return target[prop as keyof typeof target];
    },
  });
}

export { env };
