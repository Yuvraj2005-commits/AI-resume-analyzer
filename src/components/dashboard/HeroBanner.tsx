export default function HeroBanner() {
  return (
    <div className="rounded-3xl p-10 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-500">
      <h1 className="text-5xl font-bold">
        AI Resume Analyzer
      </h1>

      <p className="mt-4 text-xl text-white/90">
        Analyze resumes, compare job descriptions,
        improve ATS scores, and rewrite resumes with Gemini AI.
      </p>
    </div>
  );
}