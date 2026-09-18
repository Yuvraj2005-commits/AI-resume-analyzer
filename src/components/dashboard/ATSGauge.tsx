"use client";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import { Panel } from "@/components/ui/panel";

interface Props {
  score: number;
}

export default function ATSGauge({ score }: Props) {
  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#8b5cf6" : "#ef4444";

  return (
    <Panel>
      <h2 className="mb-6 text-xl font-semibold">ATS Score</h2>

      <div className="mx-auto h-52 w-52">
        <CircularProgressbar
          value={score}
          text={`${score}`}
          styles={buildStyles({
            pathColor: color,
            trailColor: "rgba(255,255,255,0.08)",
            textColor: "#ffffff",
            textSize: "18px",
          })}
        />
      </div>

      <p className="mt-6 text-center text-muted-foreground">
        Resume optimization score
      </p>
    </Panel>
  );
}