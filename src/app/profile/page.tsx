import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-10">

        <div className="rounded-3xl border border-white/10 bg-[#111118] p-10">

          <div className="flex items-center gap-6">

            <img
              src={
                session.user.image ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-violet-500"
            />

            <div>
              <h1 className="text-4xl font-bold">
                {session.user.name}
              </h1>

              <p className="text-gray-400 mt-2">
                {session.user.email}
              </p>
            </div>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="rounded-2xl bg-black/40 p-6">
              <h3 className="text-gray-400">
                ATS Reports
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                4
              </h1>
            </div>

            <div className="rounded-2xl bg-black/40 p-6">
              <h3 className="text-gray-400">
                Best Score
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                92
              </h1>
            </div>

            <div className="rounded-2xl bg-black/40 p-6">
              <h3 className="text-gray-400">
                Avg Match
              </h3>

              <h1 className="text-4xl font-bold mt-2">
                66%
              </h1>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}