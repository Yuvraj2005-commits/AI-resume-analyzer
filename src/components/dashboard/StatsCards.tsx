"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Target, FileText, Crown } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    bestScore: 0,
    avgMatch: 0,
  });

  const [usage, setUsage] = useState<{
    plan: "free" | "pro";
    used: number;
    limit: number | null;
    remaining: number | null;
  } | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats");

        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await res.json();

        setStats({
          totalAnalyses: data.totalAnalyses || 0,
          bestScore: data.bestScore || 0,
          avgMatch: data.avgMatch || 0,
        });
      } catch (error) {
        console.error(error);
      }
    }

    async function loadUsage() {
      try {
        const res = await fetch("/api/usage");
        if (!res.ok) return;
        setUsage(await res.json());
      } catch (error) {
        console.error(error);
      }
    }

    loadStats();
    loadUsage();
  }, []);

  const cards = [
    {
      title: "Best ATS Score",
      value: stats.bestScore,
      icon: TrendingUp,
      gradient: "from-violet-600 to-purple-500",
    },
    {
      title: "Average Match",
      value: `${stats.avgMatch}%`,
      icon: Target,
      gradient: "from-cyan-600 to-blue-500",
    },
    {
      title: "Total Analyses",
      value: stats.totalAnalyses,
      icon: FileText,
      gradient: "from-emerald-600 to-green-500",
    },
    {
      title: "Plan",
      value: usage?.plan === "pro" ? "Pro" : `Free (${usage?.remaining ?? "–"} left)`,
      icon: Crown,
      gradient: "from-amber-500 to-orange-500",
      href: usage?.plan === "pro" ? undefined : "/pricing",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-border
              bg-card
              p-8
              transition-all
              duration-300
              hover:border-white/20
            "
          >
            {card.href && (
              <Link href={card.href} className="absolute inset-0 z-20" aria-label={`Manage ${card.title}`} />
            )}
            <div
              className={`
                absolute
                top-0
                right-0
                h-32
                w-32
                rounded-full
                bg-gradient-to-r
                ${card.gradient}
                blur-3xl
                opacity-20
                group-hover:opacity-40
                transition
              `}
            />

            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2
                  className={`mt-3 font-bold text-foreground ${
                    typeof card.value === "string" && card.value.length > 6
                      ? "text-2xl"
                      : "text-5xl"
                  }`}
                >
                  {card.value}
                </h2>
              </div>

              <div
                className={`
                  h-16
                  w-16
                  rounded-2xl
                  bg-gradient-to-r
                  ${card.gradient}
                  flex
                  items-center
                  justify-center
                  shadow-lg
                `}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}