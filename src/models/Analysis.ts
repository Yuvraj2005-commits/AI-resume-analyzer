import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema(
  {
    userEmail: String,
    atsScore: Number,
    jobMatch: Number,

    strengths: [String],
    weaknesses: [String],
    suggestions: [String],

    matchedSkills: [String],
    missingSkills: [String],
    keywordsToAdd: [String],

    resumeText: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Analysis ||
  mongoose.model("Analysis", AnalysisSchema);