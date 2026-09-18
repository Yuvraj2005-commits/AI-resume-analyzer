export interface AnalysisResult {
  atsScore: number;
  jobMatch: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  matchedSkills: string[];
  missingSkills: string[];
  keywordsToAdd: string[];
}

export interface AnalysisRecord extends AnalysisResult {
  _id: string;
  userEmail: string;
  resumeText: string;
  createdAt: string;
}
