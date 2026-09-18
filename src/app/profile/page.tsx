import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Crown } from "lucide-react";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import Analysis from "@/models/Analysis";
import { getUsageSummary } from "@/lib/plans";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";
import { Panel } from "@/components/ui/panel";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/");
  }

  await connectDB();

  const analyses = await Analysis.find({
    userEmail: session.user.email,
  });

  const totalReports = analyses.length;

  const bestScore =
    analyses.length > 0
      ? Math.max(...analyses.map((a) => a.atsScore))
      : 0;

  const avgMatch =
    analyses.length > 0
      ? Math.round(
          analyses.reduce((sum, a) => sum + (a.jobMatch || 0), 0) /
            analyses.length
        )
      : 0;

  const usage = await getUsageSummary(session.user.email);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 md:hidden">
            <MobileSidebar />
          </div>

          <Panel>
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <Image
                src={session.user.image || "https://ui-avatars.com/api/?name=User"}
                alt="profile"
                width={128}
                height={128}
                className="h-32 w-32 rounded-full border-4 border-violet-500 object-cover"
              />

              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold">{session.user.name}</h1>
                <p className="mt-2 text-muted-foreground">{session.user.email}</p>

                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-black/20 px-3 py-1 text-xs font-semibold">
                  <Crown size={12} className={usage.plan === "pro" ? "text-amber-400" : "text-muted-foreground"} />
                  {usage.plan === "pro" ? "Pro Plan" : "Free Plan"}
                </span>
              </div>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-black/40 p-6">
                <p className="text-muted-foreground">Total Reports</p>
                <h2 className="mt-3 text-5xl font-bold">{totalReports}</h2>
              </div>

              <div className="rounded-2xl bg-black/40 p-6">
                <p className="text-muted-foreground">Best ATS Score</p>
                <h2 className="mt-3 text-5xl font-bold text-success">{bestScore}</h2>
              </div>

              <div className="rounded-2xl bg-black/40 p-6">
                <p className="text-muted-foreground">Average Match</p>
                <h2 className="mt-3 text-5xl font-bold text-cyan-400">{avgMatch}%</h2>
              </div>
            </div>
          </Panel>

          <Panel className="mt-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <h3 className="text-xl font-bold">
                  {usage.plan === "pro" ? "You're on Pro" : "Monthly usage"}
                </h3>
                <p className="mt-1 text-muted-foreground">
                  {usage.plan === "pro"
                    ? "Unlimited analyses and AI resume rewrites."
                    : `${usage.used} of ${usage.limit} free analyses used this month.`}
                </p>
              </div>

              {usage.plan === "free" && (
                <Link
                  href="/pricing"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 font-semibold text-white transition hover:brightness-110"
                >
                  Manage plan
                </Link>
              )}
            </div>
          </Panel>
        </div>
      </main>
    </div>
  );
}
