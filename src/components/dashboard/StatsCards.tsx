"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Target, FileText } from "lucide-react";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    bestScore: 0,
    avgMatch: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadStats();
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
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#111118] p-8 transition-all duration-300 hover:scale-[1.02] hover:border-white/20"
          >
            <div
              className={`absolute top-0 right-0 h-28 w-28 rounded-full bg-gradient-to-r ${card.gradient} blur-3xl opacity-20 group-hover:opacity-40 transition`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">
                  {card.title}
                </p>

                <h2 className="mt-3 text-5xl font-bold">
                  {card.value}
                </h2>
              </div>

              <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${card.gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}