import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { resumeText, jobDescription } = await req.json();

    const prompt = `
You are an expert resume writer.

Rewrite the resume to:
- Improve ATS compatibility
- Include stronger action verbs
- Add measurable impact where possible
- Better align with the job description
- Keep the resume professional

Return ONLY the improved resume text.

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      improvedResume: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to rewrite resume" },
      { status: 500 }
    );
  }
}