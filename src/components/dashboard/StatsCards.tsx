"use client";

import { useEffect, useState } from "react";

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalAnalyses: 0,
    bestScore: 0,
    avgMatch: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const res = await fetch("/api/stats");
      const data = await res.json();

      setStats(data);
    }

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-6 mt-8">
      <div className="border rounded-xl p-6">
        <h2>Best ATS Score</h2>
        <h1 className="text-4xl font-bold">
          {stats.bestScore}
        </h1>
      </div>

      <div className="border rounded-xl p-6">
        <h2>Average Match</h2>
        <h1 className="text-4xl font-bold">
          {stats.avgMatch}%
        </h1>
      </div>

      <div className="border rounded-xl p-6">
        <h2>Total Analyses</h2>
        <h1 className="text-4xl font-bold">
          {stats.totalAnalyses}
        </h1>
      </div>
    </div>
  );
}