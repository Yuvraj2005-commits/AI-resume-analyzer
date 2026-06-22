"use client";

import { useState } from "react";
import AnalysisResult from "./AnalysisResult";
import { Sparkles, FileText, Wand2 } from "lucide-react";


export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [rewriting, setRewriting] = useState(false);

  const [result, setResult] = useState<any>(null);
  const [improvedResume, setImprovedResume] = useState("");

  async function analyzeResume() {
    try {
      setLoading(true);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const data = await res.json();

      console.log(data);

      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function improveResume() {
    try {
      setRewriting(true);

      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      });

      const data = await res.json();

      setImprovedResume(data.improvedResume);
    } catch (error) {
      console.error(error);
    } finally {
      setRewriting(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-[#111118] p-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center">
          <Sparkles className="w-6 h-6 text-white" />
        </div>

        <div>
          <h2 className="text-4xl font-bold text-white">
            AI Resume Analyzer
          </h2>

          <p className="text-gray-400 mt-1">
            Analyze resumes, compare job descriptions,
            improve ATS scores and generate optimized resumes using Gemini AI.
          </p>
        </div>
      </div>

      {/* Resume Section */}
      <div className="mb-8">
        <label className="flex items-center gap-2 mb-3 font-semibold text-white">
          <FileText size={18} />
          Resume
        </label>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here..."
          className="w-full h-64 rounded-2xl border border-white/10 bg-black/50 p-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Job Description */}
      <div className="mb-8">
        <label className="flex items-center gap-2 mb-3 font-semibold text-white">
          <Wand2 size={18} />
          Job Description
        </label>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-52 rounded-2xl border border-white/10 bg-black/50 p-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">

        <button
          onClick={analyzeResume}
          disabled={loading}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-3 font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
         {loading ? (
  <div className="flex items-center gap-2">
    <span className="animate-spin">
      ⚡
    </span>
    Analyzing...
  </div>
) : (
  "Analyze Resume"
)}
        </button>

        <button
          onClick={improveResume}
          disabled={rewriting}
          className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white hover:scale-105 transition-all duration-300 disabled:opacity-50"
        >
          {rewriting ? "Improving..." : "Improve Resume"}
        </button>

      </div>

      {/* Analysis Results */}
      {result && (
        <div className="mt-10">
          <AnalysisResult result={result} />
        </div>
      )}

      {/* Improved Resume */}
      {improvedResume && (
        <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-black/40 p-6">

          <h2 className="text-2xl font-bold mb-4 text-cyan-400">
            ✨ Improved Resume
          </h2>

          <div className="rounded-2xl bg-black/60 border border-white/10 p-5 max-h-[500px] overflow-y-auto">
            <pre className="whitespace-pre-wrap text-gray-300 text-sm">
              {improvedResume}
            </pre>
          </div>

        </div>
      )}
    </div>
  );
}