import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
} from "lucide-react";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import ATSGauge from "@/components/dashboard/ATSGauge";
import { Panel } from "@/components/ui/panel";
import type { AnalysisRecord } from "@/types/analysis";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analysis Detail",
};

export default async function AnalysisPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  await connectDB();

  const { id } = await params;

  let analysis: AnalysisRecord | null = null;

  try {
    analysis = (await Analysis.findById(id).lean()) as unknown as AnalysisRecord;
  } catch {
    notFound();
  }

  // Ownership check: a valid id belonging to another user must 404, not leak data.
  if (!analysis || analysis.userEmail !== session.user.email) {
    notFound();
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 md:hidden">
            <MobileSidebar />
          </div>

          <Link
            href="/history"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to history
          </Link>

          <div className="mt-4 mb-8">
            <h1 className="text-4xl font-bold sm:text-5xl">
              Analysis Report
            </h1>
            <p className="mt-2 text-muted-foreground">
              {new Date(analysis.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <ATSGauge score={analysis.atsScore || 0} />

            <Panel className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <Target className="text-cyan-400" />
                <h2 className="text-xl font-semibold">Job Match</h2>
              </div>

              <h1 className="mt-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-7xl font-bold text-transparent">
                {analysis.jobMatch || 0}%
              </h1>

              <p className="mt-4 text-muted-foreground">
                Resume match against the job description.
              </p>
            </Panel>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <ResultCard
              title="Strengths"
              icon={<CheckCircle className="text-success" />}
              items={analysis.strengths}
            />
            <ResultCard
              title="Weaknesses"
              icon={<AlertTriangle className="text-amber-400" />}
              items={analysis.weaknesses}
            />
            <ResultCard
              title="Suggestions"
              icon={<Lightbulb className="text-cyan-400" />}
              items={analysis.suggestions}
            />
            <ResultCard
              title="Matched Skills"
              icon={<CheckCircle className="text-emerald-400" />}
              items={analysis.matchedSkills}
            />
            <ResultCard
              title="Missing Skills"
              icon={<Target className="text-red-400" />}
              items={analysis.missingSkills}
            />
            <ResultCard
              title="Keywords To Add"
              icon={<Target className="text-violet-400" />}
              items={analysis.keywordsToAdd}
            />
          </div>

          <Panel className="mt-6">
            <h2 className="mb-4 text-xl font-bold">Resume Text</h2>
            <pre className="max-h-[500px] overflow-auto whitespace-pre-wrap rounded-2xl bg-black/40 p-5 text-sm text-muted-foreground">
              {analysis.resumeText}
            </pre>
          </Panel>
        </div>
      </main>
    </div>
  );
}

function ResultCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items?: string[];
}) {
  return (
    <Panel>
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <ul className="space-y-3">
        {items?.length ? (
          items.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              • {item}
            </li>
          ))
        ) : (
          <li className="text-sm text-muted-foreground">No data available</li>
        )}
      </ul>
    </Panel>
  );
}
