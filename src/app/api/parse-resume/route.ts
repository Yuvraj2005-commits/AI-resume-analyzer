import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { extractPdfText } from "@/lib/pdf";

const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are supported" },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File is too large (max 8MB)" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractPdfText(buffer);

    if (!text.trim()) {
      return NextResponse.json(
        { error: "Couldn't extract any text from that PDF. It may be a scanned image — try pasting the text instead." },
        { status: 422 }
      );
    }

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Parse resume error:", error);

    return NextResponse.json(
      { error: "Failed to read that PDF. Try pasting the resume text instead." },
      { status: 500 }
    );
  }
}
