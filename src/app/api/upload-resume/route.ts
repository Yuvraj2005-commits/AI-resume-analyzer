import { NextRequest, NextResponse } from "next/server";
import { extractPdfText } from "../../../lib/pdf";
import Analysis from "../../../models/Analysis";
import { connectDB } from "./../../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const file = formData.get("resume") as File;
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(
      await file.arrayBuffer()
    );

    const resumeText = await extractPdfText(buffer);

    const analysis = await Analysis.create({
      userEmail: email,
      fileName: file.name,
      resumeText: resumeText,
      targetRole: role,
    });

    return NextResponse.json({
      success: true,
      id: analysis._id,
      textLength: resumeText.length,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}