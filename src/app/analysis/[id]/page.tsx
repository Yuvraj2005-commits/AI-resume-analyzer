import Analysis from "@/models/Analysis";
import { connectDB } from "@/lib/mongodb";

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();

  const { id } = await params;

  const analysis = await Analysis.findById(id);

  if (!analysis) {
    return <div>Analysis not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-8">
        ATS Score: {analysis.atsScore}
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-4">
            Strengths
          </h2>

          <ul>
            {analysis.strengths.map(
              (item: string) => (
                <li key={item}>
                  ✅ {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-4">
            Weaknesses
          </h2>

          <ul>
            {analysis.weaknesses.map(
              (item: string) => (
                <li key={item}>
                  ⚠️ {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-bold text-xl mb-4">
            Suggestions
          </h2>

          <ul>
            {analysis.suggestions.map(
              (item: string) => (
                <li key={item}>
                  💡 {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="border rounded-xl p-6 mt-8">
        <h2 className="font-bold text-xl mb-4">
          Resume Text
        </h2>

        <pre className="whitespace-pre-wrap">
          {analysis.resumeText}
        </pre>
      </div>
    </div>
  );
}