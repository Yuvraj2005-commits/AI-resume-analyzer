"use client";

import { motion } from "framer-motion";

export default function HeroBanner() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
      rounded-3xl
      p-12
      bg-gradient-to-r
      from-violet-600
      via-fuchsia-600
      to-cyan-500
      "
    >
      <h1 className="text-6xl font-bold">
        AI Resume Analyzer
      </h1>

      <p className="mt-4 text-xl text-white/90">
        Analyze resumes, compare job descriptions,
        improve ATS scores and rewrite resumes with Gemini AI.
      </p>
    </motion.div>
  );
}