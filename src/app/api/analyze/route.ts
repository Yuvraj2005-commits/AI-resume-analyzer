import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import Analysis from "@/models/Analysis";
import { connectDB } from "@/lib/mongodb";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    const { resumeText , jobDescription} = await req.json();

    const prompt = `
You are an expert ATS and recruiting system.

Analyze the resume against the job description.

Return ONLY JSON.

{
  "atsScore": 85,
  "jobMatch": 80,
  "strengths": ["item"],
  "weaknesses": ["item"],
  "suggestions": ["item"],
  "missingSkills": ["item"],
  "keywordsToAdd": ["item"]
}

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text ?? "{}";

    console.log("Gemini Response:");
    console.log(text);

    const result = JSON.parse(text);
    await connectDB();
    const session = await auth();

    await Analysis.create({
      userEmail: session?.user?.email,
      atsScore: result.atsScore,
      jobMatch: result.jobMatch,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      suggestions: result.suggestions,
      resumeText,
    });



    return NextResponse.json(result);
  } catch (error) {
    console.error("Analyze Error:", error);

    return NextResponse.json(
      {
        error: "Analysis failed",
      },
      {
        status: 500,
      },
    );
  }
}

