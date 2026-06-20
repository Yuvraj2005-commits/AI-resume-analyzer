import { NextResponse } from "next/server";
import { auth } from "@/auth";
import Analysis from "@/models/Analysis";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();

  const session = await auth();

  const analyses = await Analysis.find({
    userEmail: session?.user?.email,
  });

  if (analyses.length === 0) {
    return NextResponse.json({
      totalAnalyses: 0,
      bestScore: 0,
      avgMatch: 0,
    });
  }

  const bestScore = Math.max(
    ...analyses.map((a) => a.atsScore || 0)
  );

  const avgMatch =
    analyses.reduce(
      (sum, a) => sum + (a.jobMatch || 0),
      0
    ) / analyses.length;

  return NextResponse.json({
    totalAnalyses: analyses.length,
    bestScore,
    avgMatch: Math.round(avgMatch),
  });
}