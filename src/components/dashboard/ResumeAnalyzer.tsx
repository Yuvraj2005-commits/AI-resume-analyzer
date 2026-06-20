"use client";

import { useState } from "react";
import AnalysisResult from "./AnalysisResult";

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

      console.log("API RESPONSE:");
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
    <div className="border rounded-xl p-6 mt-8">
      <h2 className="text-3xl font-bold mb-6">
        AI Resume Analyzer & Job Matcher
      </h2>

      {/* Resume Input */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Resume
        </label>

        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          placeholder="Paste your resume here..."
          className="w-full h-64 border rounded-lg p-4 text-black"
        />
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">
          Job Description
        </label>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-48 border rounded-lg p-4 text-black"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={analyzeResume}
          disabled={loading}
          className="bg-white text-black px-5 py-2 rounded-lg font-semibold"
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        <button
          onClick={improveResume}
          disabled={rewriting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
        >
          {rewriting
            ? "Improving..."
            : "Improve Resume"}
        </button>
      </div>

      {/* Analysis Result */}
      {result && (
        <div className="mt-8">
          <AnalysisResult result={result} />
        </div>
      )}

      {/* Improved Resume */}
      {improvedResume && (
        <div className="border rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Improved Resume
          </h2>

          <div className="bg-gray-900 rounded-lg p-4 overflow-auto">
            <pre className="whitespace-pre-wrap text-sm">
              {improvedResume}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}