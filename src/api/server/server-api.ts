import { createTRPCContext, createCallerFactory } from "./trpc";
import { appRouter } from "./root";

export const serverApi = () => {
  const context = createTRPCContext({ isServer: true });
  const caller = createCallerFactory(appRouter);
  return caller(context);
};
