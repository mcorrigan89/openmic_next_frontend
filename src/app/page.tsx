import { serverApi } from "@/api/server/server-api";
import { TopBar } from "@/components/top-bar";

export const dynamic = "force-dynamic";

export default async function Home() {
  const res = await serverApi().user.me();
  return (
    <div className="flex min-h-screen flex-col items-center justify-items-center p-8 pb-20 font-sans sm:p-20">
      <TopBar />
      {/* {JSON.stringify(res)} */}
    </div>
  );
}
