import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import Analysis from "@/models/Analysis";
import { connectDB } from "@/lib/mongodb";
import { auth } from "@/auth";
import { getUsageSummary } from "@/lib/plans";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { resumeText, jobDescription } = await req.json();

    if (!resumeText?.trim() || !jobDescription?.trim()) {
      return NextResponse.json(
        { error: "Resume and job description are both required" },
        { status: 400 }
      );
    }

    await connectDB();

    const usage = await getUsageSummary(session.user.email);

    if (usage.plan === "free" && usage.remaining !== null && usage.remaining <= 0) {
      return NextResponse.json(
        {
          error: "limit_reached",
          message: `You've used all ${usage.limit} free analyses this month. Upgrade to Pro for unlimited analyses.`,
          usage,
        },
        { status: 403 }
      );
    }

    const prompt = `
You are an expert ATS Resume Analyzer and Recruiter.

Analyze the resume against the job description.

Return ONLY valid JSON.

{
  "atsScore": 85,
  "jobMatch": 80,
  "strengths": ["Strong React experience"],
  "weaknesses": ["Missing cloud experience"],
  "suggestions": [
    "Add quantified achievements",
    "Mention CI/CD experience"
  ],
  "matchedSkills": [
    "React",
    "Node.js",
    "MongoDB"
  ],
  "missingSkills": [
    "Docker",
    "AWS",
    "Kubernetes"
  ],
  "keywordsToAdd": [
    "Microservices",
    "CI/CD",
    "REST APIs"
  ]
}

Rules:
- ATS Score between 0-100
- Job Match between 0-100
- matchedSkills = skills found in both resume and JD
- missingSkills = important JD skills missing from resume
- keywordsToAdd = ATS keywords recruiter expects
- suggestions = actionable improvements
- Return JSON only

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

    let result;

    try {
      result = JSON.parse(text);
    } catch {
      console.error("Gemini returned non-JSON output:", text);
      return NextResponse.json(
        { error: "The AI response couldn't be parsed. Please try again." },
        { status: 502 }
      );
    }

    await Analysis.create({
      userEmail: session.user.email,
      atsScore: result.atsScore,
      jobMatch: result.jobMatch,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      suggestions: result.suggestions,
      matchedSkills: result.matchedSkills,
      missingSkills: result.missingSkills,
      keywordsToAdd: result.keywordsToAdd,
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
