import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/lib/plans";
import UpgradeButton from "@/components/UpgradeButton";
import Link from "next/link";

export default function PricingSection({
  showEyebrow = true,
}: {
  showEyebrow?: boolean;
}) {
  return (
    <div>
      {showEyebrow && (
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold sm:text-5xl">
            Simple, honest pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you&apos;re applying to more than a
            couple of roles a month.
          </p>
        </div>
      )}

      <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={cn(
              "relative flex flex-col rounded-3xl border p-8",
              plan.highlighted
                ? "border-violet-500/40 bg-gradient-to-b from-violet-950/40 to-card"
                : "border-border bg-card"
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-8 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-3 py-1 text-xs font-semibold text-white">
                Most popular
              </span>
            )}

            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{plan.tagline}</p>

            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.priceSuffix && (
                <span className="text-muted-foreground">{plan.priceSuffix}</span>
              )}
            </div>

            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check size={18} className="mt-0.5 shrink-0 text-violet-400" />
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              {plan.id === "free" ? (
                <Link
                  href="/dashboard"
                  className="flex h-13 w-full items-center justify-center rounded-2xl border border-border px-7 text-base font-medium transition hover:bg-white/5"
                >
                  Get started free
                </Link>
              ) : (
                <UpgradeButton className="w-full" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
