import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-6xl font-bold">
          AI Resume Analyzer
        </h1>

        <p className="text-xl mt-6 text-gray-400">
          Analyze resumes, match job descriptions,
          improve ATS scores and rewrite resumes
          using Gemini AI.
        </p>

        <div className="flex gap-4 mt-10">
          <Link
            href="/dashboard"
            className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
          >
            Get Started
          </Link>

          <Link
            href="/history"
            className="border px-6 py-3 rounded-lg"
          >
            View History
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold">
              ATS Analysis
            </h3>

            <p className="mt-2 text-gray-400">
              Get ATS scores and feedback.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold">
              Job Matching
            </h3>

            <p className="mt-2 text-gray-400">
              Compare resume with job descriptions.
            </p>
          </div>

          <div className="border rounded-xl p-6">
            <h3 className="text-xl font-bold">
              Resume Rewriter
            </h3>

            <p className="mt-2 text-gray-400">
              Improve resumes using Gemini AI.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}