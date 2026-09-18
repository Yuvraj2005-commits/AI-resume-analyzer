import Link from "next/link";
import { History as HistoryIcon, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import { EmptyState } from "@/components/ui/empty-state";
import { Panel } from "@/components/ui/panel";
import type { AnalysisRecord } from "@/types/analysis";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analysis History",
};

export default async function HistoryPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  await connectDB();

  const analyses = (await Analysis.find({
    userEmail: session.user.email,
  })
    .sort({ createdAt: -1 })
    .lean()) as unknown as AnalysisRecord[];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 md:hidden">
            <MobileSidebar />
          </div>

          <div className="mb-10">
            <h1 className="text-4xl font-bold sm:text-5xl">Analysis History</h1>

            <p className="mt-2 text-muted-foreground">
              Every ATS report you&apos;ve run, newest first.
            </p>
          </div>

          {analyses.length === 0 ? (
            <EmptyState
              icon={HistoryIcon}
              title="No analyses yet"
              description="Run your first resume analysis and it will show up here, alongside your ATS score history over time."
              actionLabel="Analyze a resume"
              actionHref="/dashboard"
            />
          ) : (
            <div className="space-y-6">
              {analyses.map((analysis) => (
                <Link
                  key={analysis._id.toString()}
                  href={`/analysis/${analysis._id.toString()}`}
                  className="block"
                >
                  <Panel className="group transition hover:border-violet-500/40">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h2 className="text-2xl font-bold">
                            ATS Score {analysis.atsScore}
                          </h2>

                          <ArrowRight
                            size={18}
                            className="text-muted-foreground transition group-hover:translate-x-1 group-hover:text-violet-400"
                          />
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground">
                          {new Date(analysis.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <div className="rounded-2xl bg-success/10 px-5 py-3">
                          <p className="text-xs text-muted-foreground">ATS</p>
                          <h3 className="text-xl font-bold text-success">
                            {analysis.atsScore}
                          </h3>
                        </div>

                        <div className="rounded-2xl bg-cyan-500/10 px-5 py-3">
                          <p className="text-xs text-muted-foreground">Match</p>
                          <h3 className="text-xl font-bold text-cyan-400">
                            {analysis.jobMatch}%
                          </h3>
                        </div>
                      </div>
                    </div>

                    {analysis.suggestions?.length > 0 && (
                      <div className="mt-6">
                        <h4 className="mb-2 font-semibold">Top suggestions</h4>

                        <ul className="space-y-2">
                          {analysis.suggestions.slice(0, 3).map((suggestion, index) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              • {suggestion}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Panel>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
