import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import HeroBanner from "@/components/dashboard/HeroBanner";
import StatsCards from "@/components/dashboard/StatsCards";
import ResumeAnalyzer from "@/components/dashboard/ResumeAnalyzer";
import Navbar from "@/components/dashboard/Navbar";
import MobileSidebar from "@/components/dashboard/MobileSidebar";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <Navbar />

          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Welcome, {session.user.name}</h1>

            <p className="text-gray-400 mt-2">
              Analyze resumes, improve ATS scores, match job descriptions, and
              generate AI-powered resume improvements.
            </p>
          </div>
          <div className="mb-6">
            <MobileSidebar />
          </div>
          {/* Hero Banner */}
          <HeroBanner />

          {/* Stats */}
          <div className="mt-8">
            <StatsCards />
          </div>

          {/* Resume Analyzer */}
          <div className="mt-8">
            <ResumeAnalyzer />
          </div>
        </div>
      </main>
    </div>
  );
}
