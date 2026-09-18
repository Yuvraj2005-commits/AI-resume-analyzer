"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "How does ResumeAI score my resume?",
    a: "We send your resume and the target job description to Google's Gemini model, which scores ATS-compatibility, formatting, and how well your experience matches the role — then returns strengths, weaknesses, missing skills, and concrete suggestions.",
  },
  {
    q: "Is my resume data private?",
    a: "Yes. Analyses are tied to your account and only visible to you. We don't share resume content with anyone other than the AI provider used to generate your report.",
  },
  {
    q: "What counts toward my monthly limit?",
    a: "Each time you run \"Analyze Resume\" it counts as one analysis. The Free plan includes 3 per calendar month; Pro is unlimited.",
  },
  {
    q: "Can I upload a PDF instead of pasting text?",
    a: "Yes — drag and drop a PDF resume on the dashboard and we'll extract the text automatically. You can still paste text directly if you prefer.",
  },
  {
    q: "What's the AI resume rewrite feature?",
    a: "It's a Pro feature that generates a full ATS-optimized LaTeX resume tailored to a specific job description, ready to compile or paste into an editor like Overleaf.",
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div>
      <h2 className="text-center text-4xl font-bold sm:text-5xl">
        Frequently asked questions
      </h2>

      <div className="mt-10 divide-y divide-border rounded-3xl border border-border bg-card">
        {FAQS.map((item, index) => {
          const isOpen = open === index;

          return (
            <div key={item.q} className="px-6">
              <button
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-semibold">{item.q}</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "shrink-0 text-muted-foreground transition-transform",
                    isOpen && "rotate-180 text-violet-400"
                  )}
                />
              </button>

              {isOpen && (
                <p className="pb-5 text-sm text-muted-foreground">{item.a}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
