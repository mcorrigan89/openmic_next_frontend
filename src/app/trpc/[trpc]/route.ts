import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { createTRPCContext } from "@/api/server/trpc";
import { appRouter } from "@/api/server/root";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ isServer: false }),
    responseMeta: () => {
      return {
        headers: {
          "cache-control": `public, must-revalidate, proxy-revalidate, max-age=0`,
        },
      };
    },
  });

export { handler as GET, handler as POST };
