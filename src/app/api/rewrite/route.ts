import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import { getUserPlan } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeText, jobDescription } = await req.json();

    if (!resumeText?.trim()) {
      return NextResponse.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const plan = await getUserPlan(session.user.email);

    if (plan !== "pro") {
      return NextResponse.json(
        {
          error: "pro_required",
          message: "AI resume rewriting is a Pro feature. Upgrade to generate an ATS-optimized LaTeX resume.",
        },
        { status: 403 }
      );
    }

    const prompt = `
You are an expert ATS Resume Writer.

Convert the following resume into a professional ATS-optimized LaTeX resume.

Requirements:

- Return ONLY valid LaTeX code
- One page ATS-friendly resume
- Modern professional formatting
- Improve bullet points
- Quantify achievements where possible
- Keep all important information
- No explanations
- No markdown
- Output pure LaTeX

Resume:
${resumeText}

Job Description:
${jobDescription || "Not provided"}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const latexResume = response.text ?? "";

    if (!latexResume.trim()) {
      return NextResponse.json(
        { error: "The AI didn't return a resume. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      improvedResume: latexResume,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to rewrite resume",
      },
      {
        status: 500,
      }
    );
  }
}
