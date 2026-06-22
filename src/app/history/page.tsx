import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";

export default async function HistoryPage() {
  await connectDB();

  const analyses = await Analysis.find({})
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Analysis History
          </h1>

          <p className="text-gray-400 mt-2">
            Track all your ATS reports and resume improvements.
          </p>
        </div>

        <div className="space-y-6">
          {analyses.map((analysis: any) => (
            <div
              key={analysis._id.toString()}
              className="
              rounded-3xl
              border
              border-white/10
              bg-[#111118]
              p-6
              hover:border-violet-500/30
              transition
              "
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                
                <div>
                  <h2 className="text-2xl font-bold">
                    ATS Score {analysis.atsScore}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {new Date(
                      analysis.createdAt
                    ).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="rounded-2xl bg-green-500/10 px-5 py-3">
                    <p className="text-xs text-gray-400">
                      ATS
                    </p>

                    <h3 className="text-xl font-bold text-green-400">
                      {analysis.atsScore}
                    </h3>
                  </div>

                  <div className="rounded-2xl bg-cyan-500/10 px-5 py-3">
                    <p className="text-xs text-gray-400">
                      Match
                    </p>

                    <h3 className="text-xl font-bold text-cyan-400">
                      {analysis.jobMatch}%
                    </h3>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-2">
                  Suggestions
                </h4>

                <ul className="space-y-2">
                  {analysis.suggestions
                    ?.slice(0, 3)
                    .map(
                      (
                        suggestion: string,
                        index: number
                      ) => (
                        <li
                          key={index}
                          className="text-gray-400"
                        >
                          • {suggestion}
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}