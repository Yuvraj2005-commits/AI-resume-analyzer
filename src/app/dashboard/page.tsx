import type { Metadata } from "next";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import HeroBanner from "@/components/dashboard/HeroBanner";
import StatsCards from "@/components/dashboard/StatsCards";
import ResumeAnalyzer from "@/components/dashboard/ResumeAnalyzer";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold">Welcome, {session.user.name}</h1>

              <p className="mt-2 text-muted-foreground">
                Analyze resumes, improve ATS scores, match job descriptions, and
                generate AI-powered resume improvements.
              </p>
            </div>

            <MobileSidebar />
          </div>

          <HeroBanner />

          <div className="mt-8">
            <StatsCards />
          </div>

          <div className="mt-8">
            <ResumeAnalyzer />
          </div>
        </div>
      </main>
    </div>
  );
}
