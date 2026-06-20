import Analysis from "@/models/Analysis";
import { connectDB } from "@/lib/mongodb";

export default async function HistoryPage() {
  await connectDB();

  const analyses = await Analysis.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-2">
          Analysis History
        </h1>

        <p className="text-gray-400 mb-10">
          Track all your ATS reports and resume improvements.
        </p>

        <div className="space-y-6">
          {analyses.map((item: any) => (
            <div
              key={item._id}
              className="rounded-3xl border border-white/10 bg-[#111118] p-6 hover:border-violet-500/50 transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-bold">
                    ATS {item.atsScore}
                  </h2>

                  <p className="text-gray-400">
                    {new Date(
                      item.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div
                  className={`
                  px-4 py-2 rounded-full font-semibold
                  ${
                    item.atsScore >= 80
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }
                `}
                >
                  {item.jobMatch}% Match
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}