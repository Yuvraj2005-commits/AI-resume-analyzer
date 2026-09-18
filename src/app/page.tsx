import Link from "next/link";
import {
  Sparkles,
  Brain,
  FileText,
  Target,
  UploadCloud,
  Wand2,
  Star,
} from "lucide-react";

import Navbar from "@/components/dashboard/Navbar";
import Footer from "@/components/Footer";
import LoginButton from "@/components/LoginButton";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";

const FEATURES = [
  {
    icon: Brain,
    color: "text-violet-500",
    title: "ATS Analysis",
    description:
      "Get detailed ATS scores, strengths, weaknesses and optimization suggestions in seconds.",
  },
  {
    icon: Target,
    color: "text-cyan-500",
    title: "Job Matching",
    description:
      "Compare resumes with job descriptions and identify missing skills instantly.",
  },
  {
    icon: FileText,
    color: "text-green-500",
    title: "Resume Rewriter",
    description:
      "Generate ATS-friendly LaTeX resumes optimized for specific job roles using AI.",
  },
];

const STEPS = [
  {
    icon: UploadCloud,
    title: "Upload or paste",
    description: "Drop in a PDF or paste your resume and a job description.",
  },
  {
    icon: Brain,
    title: "AI analyzes",
    description: "Gemini scores your ATS-compatibility and match against the role.",
  },
  {
    icon: Wand2,
    title: "Improve & apply",
    description: "Act on suggestions, close skill gaps, and export a polished report.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Went from a 54 ATS score to 88 after applying two rounds of suggestions. Got three callbacks the same week.",
    name: "Ananya R.",
    role: "Frontend Engineer",
  },
  {
    quote:
      "The missing-skills breakdown showed me exactly which keywords recruiters were filtering on. Genuinely useful, not generic advice.",
    name: "Marcus T.",
    role: "Data Analyst",
  },
  {
    quote:
      "Uploaded my resume as a PDF, had a full report in under a minute. The job-match percentage alone saved me from applying to roles I wasn't close to.",
    name: "Priya K.",
    role: "Product Manager",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-40 pb-28">
        <div className="text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-sm">Powered by Gemini AI</span>
          </div>

          <h1 className="text-6xl font-bold leading-tight md:text-7xl">
            Analyze.
            <span className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              Improve.
            </span>
            <br />
            Get Hired.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl text-muted-foreground">
            AI-powered resume analysis, ATS scoring, job matching and resume
            rewriting to help you land better opportunities.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 md:flex-row">
            <LoginButton />

            <Link
              href="/dashboard"
              className="rounded-2xl border border-border px-8 py-4 transition hover:bg-card"
            >
              Explore Dashboard
            </Link>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Free plan includes 3 analyses a month. No credit card required.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <h2 className="text-center text-4xl font-bold sm:text-5xl">
            How it works
          </h2>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500">
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  <div className="mx-auto mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-card text-xs font-bold text-muted-foreground">
                    {index + 1}
                  </div>

                  <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <h2 className="text-center text-4xl font-bold sm:text-5xl">
            Everything you need to get past the ATS
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-border bg-card p-8 transition hover:border-violet-500/30"
                >
                  <Icon className={`mb-4 ${feature.color}`} size={32} />
                  <h3 className="text-2xl font-bold">{feature.title}</h3>
                  <p className="mt-4 text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <h2 className="text-center text-4xl font-bold sm:text-5xl">
            Job seekers who leveled up their resume
          </h2>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="rounded-3xl border border-border bg-card p-8">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-4 text-foreground/90">&ldquo;{t.quote}&rdquo;</p>

                <div className="mt-6">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <PricingSection />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-28">
          <FAQSection />
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-28 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Ready to fix your resume?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get your ATS score in under a minute — free, no card required.
          </p>

          <div className="mt-8 flex justify-center">
            <Button variant="gradient" size="xl" asChild>
              <Link href="/dashboard">Analyze my resume</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
