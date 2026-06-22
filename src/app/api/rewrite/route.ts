import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json();

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
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const latexResume = response.text ?? "";

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