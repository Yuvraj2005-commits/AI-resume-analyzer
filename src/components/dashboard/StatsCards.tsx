"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Target, FileText } from "lucide-react";
import { motion } from "framer-motion";

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
              border-white/10
              bg-[#111118]
              p-8
              transition-all
              duration-300
              hover:border-white/20
            "
          >
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
                <p className="text-gray-400 text-sm">
                  {card.title}
                </p>

                <h2 className="mt-3 text-5xl font-bold text-white">
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