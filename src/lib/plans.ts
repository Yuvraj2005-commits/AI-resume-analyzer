import Analysis from "@/models/Analysis";
import User from "@/models/User";

export const FREE_MONTHLY_ANALYSES = 3;

export type PlanId = "free" | "pro";

export interface PlanDefinition {
  id: PlanId;
  name: string;
  price: string;
  priceSuffix?: string;
  tagline: string;
  features: string[];
  highlighted?: boolean;
}

export const PLANS: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    tagline: "Try ResumeAI on your next application.",
    features: [
      `${FREE_MONTHLY_ANALYSES} resume analyses / month`,
      "ATS score & job match",
      "Strengths, weaknesses & suggestions",
      "PDF report export",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$12",
    priceSuffix: "/month",
    tagline: "For active job seekers applying every week.",
    features: [
      "Unlimited resume analyses",
      "Everything in Free",
      "AI ATS-optimized LaTeX resume rewrites",
      "Full analysis history",
      "Priority Gemini processing",
    ],
    highlighted: true,
  },
];

/** Start of the current calendar month, used as the usage-window boundary. */
function currentMonthStart() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export async function getUserPlan(userEmail: string): Promise<PlanId> {
  const user = await User.findOne({ email: userEmail }).lean<{ plan?: PlanId }>();
  return user?.plan === "pro" ? "pro" : "free";
}

export interface UsageSummary {
  plan: PlanId;
  used: number;
  limit: number | null;
  remaining: number | null;
}

export async function getUsageSummary(userEmail: string): Promise<UsageSummary> {
  const plan = await getUserPlan(userEmail);

  const used = await Analysis.countDocuments({
    userEmail,
    createdAt: { $gte: currentMonthStart() },
  });

  if (plan === "pro") {
    return { plan, used, limit: null, remaining: null };
  }

  return {
    plan,
    used,
    limit: FREE_MONTHLY_ANALYSES,
    remaining: Math.max(0, FREE_MONTHLY_ANALYSES - used),
  };
}
