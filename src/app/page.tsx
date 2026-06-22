import Link from "next/link";
import { Sparkles, Brain, FileText, Target } from "lucide-react";
import Navbar from "@/components/dashboard/Navbar";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="text-violet-500" />
            <span className="font-bold text-xl">ResumeAI</span>
          </div>

          <div className="flex gap-3">
            <Link
              href="/history"
              className="text-zinc-400 hover:text-white transition"
            >
              History
            </Link>

            <Link
              href="/dashboard"
              className="bg-white text-black px-4 py-2 rounded-xl font-semibold"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-28">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 mb-8">
            <Sparkles size={16} />
            <span className="text-sm">Powered by Gemini AI</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Analyze.
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Improve.
            </span>
            <br />
            Get Hired.
          </h1>

          <p className="text-zinc-400 text-xl max-w-3xl mx-auto mt-8">
            AI-powered resume analysis, ATS scoring, job matching and resume
            rewriting to help you land better opportunities.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <LoginButton />

            <Link
              href="/dashboard"
              className="
      border border-zinc-700
      px-8 py-4
      rounded-2xl
      hover:bg-zinc-900
      transition
    "
            >
              Explore Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-28">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <Brain className="text-violet-500 mb-4" size={32} />

            <h3 className="text-2xl font-bold">ATS Analysis</h3>

            <p className="text-zinc-400 mt-4">
              Get detailed ATS scores, strengths, weaknesses and optimization
              suggestions.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <Target className="text-cyan-500 mb-4" size={32} />

            <h3 className="text-2xl font-bold">Job Matching</h3>

            <p className="text-zinc-400 mt-4">
              Compare resumes with job descriptions and identify missing skills
              instantly.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
            <FileText className="text-green-500 mb-4" size={32} />

            <h3 className="text-2xl font-bold">Resume Rewriter</h3>

            <p className="text-zinc-400 mt-4">
              Generate ATS-friendly resumes optimized for specific job roles
              using AI.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-zinc-500">
          ResumeAI © 2026 • Built with Next.js, MongoDB, Auth.js & Gemini AI
        </div>
      </footer>
    </main>
  );
}
