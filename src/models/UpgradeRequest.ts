import mongoose from "mongoose";

const UpgradeRequestSchema = new mongoose.Schema(
  {
    userEmail: String,
    plan: {
      type: String,
      enum: ["pro"],
      default: "pro",
    },
    note: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.UpgradeRequest ||
  mongoose.model("UpgradeRequest", UpgradeRequestSchema);
