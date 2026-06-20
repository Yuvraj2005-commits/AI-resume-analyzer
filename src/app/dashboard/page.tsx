import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import ScoreCard from "@/components/dashboard/ScoreCard";
import UploadCard from "@/components/dashboard/UploadCard";
import FeedbackCard from "@/components/dashboard/FeedbackCard";
import ResumeAnalyzer from "@/components/dashboard/ResumeAnalyzer";
import StatsCards from "@/components/dashboard/StatsCards";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold">Welcome {session.user.name}</h1>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <StatsCards />
        </div>
        {/* <UploadCard />
       
        <FeedbackCard /> */}
        <ResumeAnalyzer />
      </div>
    </div>
  );
}
