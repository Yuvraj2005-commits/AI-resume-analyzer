import { NextResponse } from "next/server";
import Analysis from "@/models/Analysis";
import { connectDB } from "@/lib/mongodb";
import { auth } from "@/auth";

export async function GET() {
  await connectDB();

  const session = await auth();

  const analyses = await Analysis.find({
    userEmail: session?.user?.email,
  }).sort({ createdAt: -1 });

  return NextResponse.json(analyses);
}
