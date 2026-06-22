"use client";

import jsPDF from "jspdf";
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
} from "lucide-react";

import ATSGauge from "./ATSGauge";

interface Props {
  result: any;
}

export default function AnalysisResult({
  result,
}: Props) {
  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AI Resume Analysis Report", 20, 20);

    doc.setFontSize(14);

    doc.text(`ATS Score: ${result.atsScore}`, 20, 40);
    doc.text(`Job Match: ${result.jobMatch}%`, 20, 50);

    let y = 70;

    doc.text("Suggestions:", 20, y);
    y += 10;

    result.suggestions?.forEach(
      (item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
      }
    );

    y += 10;

    doc.text("Missing Skills:", 20, y);
    y += 10;

    result.missingSkills?.forEach(
      (item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
      }
    );

    y += 10;

    doc.text("Keywords To Add:", 20, y);
    y += 10;

    result.keywordsToAdd?.forEach(
      (item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
      }
    );

    doc.save("ATS-Report.pdf");
  };

  return (
    <div className="mt-10 space-y-8">
      {/* Top Metrics */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ATSGauge score={result.atsScore || 0} />

        <div className="rounded-3xl border border-white/10 bg-[#111118] p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Target className="text-cyan-400" />

            <h2 className="text-xl font-semibold">
              Job Match
            </h2>
          </div>

          <h1 className="text-7xl font-bold mt-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
            {result.jobMatch || 0}%
          </h1>

          <p className="text-gray-400 mt-4">
            Resume match against job description.
          </p>

          <button
            onClick={downloadReport}
            className="
              mt-8
              rounded-xl
              bg-gradient-to-r
              from-green-600
              to-emerald-600
              px-5
              py-3
              font-semibold
              hover:scale-105
              transition
            "
          >
            Download ATS Report
          </button>
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-6">
        <ResultCard
          title="Strengths"
          icon={
            <CheckCircle className="text-green-400" />
          }
          items={result.strengths}
        />

        <ResultCard
          title="Weaknesses"
          icon={
            <AlertTriangle className="text-yellow-400" />
          }
          items={result.weaknesses}
        />

        <ResultCard
          title="Suggestions"
          icon={
            <Lightbulb className="text-cyan-400" />
          }
          items={result.suggestions}
        />

        <ResultCard
          title="Matched Skills"
          icon={
            <CheckCircle className="text-emerald-400" />
          }
          items={result.matchedSkills}
        />

        <ResultCard
          title="Missing Skills"
          icon={
            <Target className="text-red-400" />
          }
          items={result.missingSkills}
        />

        <ResultCard
          title="Keywords To Add"
          icon={
            <Target className="text-violet-400" />
          }
          items={result.keywordsToAdd}
        />
      </div>
    </div>
  );
}

function ResultCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items?: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111118] p-6">
      <div className="flex items-center gap-2 mb-5">
        {icon}

        <h2 className="text-xl font-bold">
          {title}
        </h2>
      </div>

      <ul className="space-y-3">
        {items?.length ? (
          items.map((item, index) => (
            <li
              key={index}
              className="text-gray-300"
            >
              • {item}
            </li>
          ))
        ) : (
          <li className="text-gray-500">
            No data available
          </li>
        )}
      </ul>
    </div>
  );
}