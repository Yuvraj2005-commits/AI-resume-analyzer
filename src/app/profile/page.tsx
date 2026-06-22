import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  await connectDB();

  const analyses = await Analysis.find({
    userEmail: session.user.email,
  });

  const totalReports = analyses.length;

  const bestScore =
    analyses.length > 0
      ? Math.max(...analyses.map((a) => a.atsScore))
      : 0;

  const avgMatch =
    analyses.length > 0
      ? Math.round(
          analyses.reduce(
            (sum, a) => sum + (a.jobMatch || 0),
            0
          ) / analyses.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <div className="rounded-3xl border border-white/10 bg-[#111118] p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <img
              src={
                session.user.image ||
                "https://ui-avatars.com/api/?name=User"
              }
              alt="profile"
              className="w-32 h-32 rounded-full border-4 border-violet-500"
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

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Total Reports
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {totalReports}
              </h2>
            </div>

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Best ATS Score
              </p>

              <h2 className="text-5xl font-bold mt-3 text-green-400">
                {bestScore}
              </h2>
            </div>

            <div className="rounded-2xl bg-black/40 p-6">
              <p className="text-gray-400">
                Average Match
              </p>

              <h2 className="text-5xl font-bold mt-3 text-cyan-400">
                {avgMatch}%
              </h2>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}