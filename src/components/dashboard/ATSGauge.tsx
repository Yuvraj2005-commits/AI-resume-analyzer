"use client";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

interface Props {
  score: number;
}

export default function ATSGauge({
  score,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111118] p-8">
      <h2 className="text-xl font-semibold mb-6">
        ATS Score
      </h2>

      <div className="w-52 h-52 mx-auto">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: "#8b5cf6",
            trailColor: "#27272a",
            textColor: "#ffffff",
            textSize: "18px",
          })}
        />
      </div>

      <p className="text-center text-gray-400 mt-6">
        Resume optimization score
      </p>
    </div>
  );
}