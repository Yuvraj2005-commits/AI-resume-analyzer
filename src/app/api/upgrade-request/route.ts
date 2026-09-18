import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import UpgradeRequest from "@/models/UpgradeRequest";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { note } = await req.json().catch(() => ({ note: undefined }));

  await connectDB();

  await UpgradeRequest.create({
    userEmail: session.user.email,
    plan: "pro",
    note,
  });

  return NextResponse.json({ success: true });
}
