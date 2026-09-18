"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sparkles, FileText, Wand2, UploadCloud, Loader2, Lock } from "lucide-react";

import AnalysisResult from "./AnalysisResult";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import type { AnalysisResult as AnalysisResultType } from "@/types/analysis";
import type { UsageSummary } from "@/lib/plans";

export default function ResumeAnalyzer() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [rewriting, setRewriting] = useState(false);
  const [parsingPdf, setParsingPdf] = useState(false);
  const [dragging, setDragging] = useState(false);

  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [improvedResume, setImprovedResume] = useState("");
  const [usage, setUsage] = useState<UsageSummary | null>(null);

  const refreshUsage = useCallback(async () => {
    try {
      const res = await fetch("/api/usage");
      if (!res.ok) return;
      setUsage(await res.json());
    } catch {
      // usage display is best-effort, ignore failures
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/usage");
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!cancelled) setUsage(data);
      } catch {
        // usage display is best-effort, ignore failures
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handlePdfFile(file: File) {
    if (file.type !== "application/pdf") {
      toast({
        variant: "error",
        title: "Unsupported file",
        description: "Only PDF files can be uploaded — try pasting the text instead.",
      });
      return;
    }

    try {
      setParsingPdf(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to read PDF");
      }

      setResumeText(data.text);
      toast({
        variant: "success",
        title: "Resume imported",
        description: `Extracted text from ${file.name}.`,
      });
    } catch (error) {
      toast({
        variant: "error",
        title: "Couldn't read that PDF",
        description: error instanceof Error ? error.message : undefined,
      });
    } finally {
      setParsingPdf(false);
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handlePdfFile(file);
  }

  async function analyzeResume() {
    if (!resumeText.trim() || !jobDescription.trim()) {
      toast({
        variant: "error",
        title: "Missing information",
        description: "Add both your resume and a job description first.",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "limit_reached") {
          setUsage(data.usage);
          toast({
            variant: "error",
            title: "Free plan limit reached",
            description: data.message,
          });
          return;
        }

        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
      refreshUsage();
    } catch (error) {
      toast({
        variant: "error",
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  async function improveResume() {
    if (!resumeText.trim()) {
      toast({
        variant: "error",
        title: "Add a resume first",
      });
      return;
    }

    try {
      setRewriting(true);

      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error === "pro_required") {
          toast({
            variant: "info",
            title: "Pro feature",
            description: data.message,
          });
          return;
        }

        throw new Error(data.error || "Failed to rewrite resume");
      }

      setImprovedResume(data.improvedResume);
    } catch (error) {
      toast({
        variant: "error",
        title: "Rewrite failed",
        description: error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setRewriting(false);
    }
  }

  const atLimit = usage?.plan === "free" && usage.remaining === 0;

  return (
    <Panel>
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500">
          <Sparkles className="h-6 w-6 text-white" />
        </div>

        <div>
          <h2 className="text-4xl font-bold">AI Resume Analyzer</h2>
          <p className="mt-1 text-muted-foreground">
            Upload or paste your resume, compare it against a job description, and
            get an ATS-ready action plan.
          </p>
        </div>
      </div>

      {usage?.plan === "free" && (
        <div
          className={cn(
            "mb-8 flex items-center justify-between gap-4 rounded-2xl border px-5 py-3 text-sm",
            atLimit
              ? "border-destructive/30 bg-destructive/10 text-destructive"
              : "border-border bg-black/20 text-muted-foreground"
          )}
        >
          <span>
            {atLimit
              ? "You've used all your free analyses this month."
              : `${usage.remaining} of ${usage.limit} free analyses left this month.`}
          </span>
          <Link href="/pricing" className="font-semibold whitespace-nowrap text-violet-400 hover:underline">
            Upgrade to Pro
          </Link>
        </div>
      )}

      {/* Resume Section */}
      <div className="mb-8">
        <label className="mb-3 flex items-center gap-2 font-semibold">
          <FileText size={18} />
          Resume
        </label>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={cn(
            "relative rounded-2xl border-2 border-dashed transition",
            dragging ? "border-violet-500 bg-violet-500/5" : "border-white/10"
          )}
        >
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume here, or drag & drop a PDF..."
            className="h-64 w-full rounded-2xl bg-black/50 p-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <div className="absolute right-4 bottom-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePdfFile(file);
                e.target.value = "";
              }}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={parsingPdf}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-card px-3 py-2 text-xs font-medium text-muted-foreground transition hover:text-foreground disabled:opacity-50"
            >
              {parsingPdf ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <UploadCloud size={14} />
              )}
              {parsingPdf ? "Reading PDF..." : "Upload PDF"}
            </button>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-8">
        <label className="mb-3 flex items-center gap-2 font-semibold">
          <Wand2 size={18} />
          Job Description
        </label>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="h-52 w-full rounded-2xl border border-white/10 bg-black/50 p-5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          variant="gradient"
          size="xl"
          onClick={analyzeResume}
          disabled={loading || atLimit}
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Analyzing...
            </>
          ) : atLimit ? (
            <>
              <Lock size={16} /> Limit reached
            </>
          ) : (
            "Analyze Resume"
          )}
        </Button>

        <Button
          variant="outline"
          size="xl"
          onClick={improveResume}
          disabled={rewriting}
          className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
        >
          {rewriting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 size={16} /> Generate LaTeX Resume
              {usage?.plan === "free" && <Lock size={14} className="opacity-60" />}
            </>
          )}
        </Button>
      </div>

      {/* Analysis Results */}
      {result && (
        <div className="mt-10">
          <AnalysisResult result={result} />
        </div>
      )}

      {/* ATS Optimized LaTeX Resume */}
      {improvedResume && (
        <div className="mt-10 rounded-3xl border border-cyan-500/20 bg-black/40 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-cyan-400">
              ✨ ATS Optimized LaTeX Resume
            </h2>

            <button
              onClick={() => {
                navigator.clipboard.writeText(improvedResume);
                toast({ variant: "success", title: "Copied to clipboard" });
              }}
              className="rounded-xl bg-cyan-600 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700"
            >
              Copy LaTeX
            </button>
          </div>

          <div className="max-h-[700px] overflow-auto rounded-2xl border border-white/10 bg-black/60 p-5">
            <pre className="text-sm whitespace-pre-wrap text-green-400">
              {improvedResume}
            </pre>
          </div>
        </div>
      )}
    </Panel>
  );
}
