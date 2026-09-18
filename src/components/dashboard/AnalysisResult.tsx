"use client";

import jsPDF from "jspdf";
import {
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Target,
  Download,
} from "lucide-react";

import ATSGauge from "./ATSGauge";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import type { AnalysisResult as AnalysisResultType } from "@/types/analysis";

interface Props {
  result: AnalysisResultType;
}

export default function AnalysisResult({ result }: Props) {
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

    result.suggestions?.forEach((item: string) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("Missing Skills:", 20, y);
    y += 10;

    result.missingSkills?.forEach((item: string) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("Keywords To Add:", 20, y);
    y += 10;

    result.keywordsToAdd?.forEach((item: string) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });

    doc.save("ATS-Report.pdf");
  };

  return (
    <div className="mt-10 space-y-8">
      {/* Top Metrics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ATSGauge score={result.atsScore || 0} />

        <Panel className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <Target className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Job Match</h2>
          </div>

          <h1 className="mt-4 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-7xl font-bold text-transparent">
            {result.jobMatch || 0}%
          </h1>

          <p className="mt-4 text-muted-foreground">
            Resume match against job description.
          </p>

          <Button
            onClick={downloadReport}
            variant="gradient"
            size="xl"
            className="mt-8 w-fit from-green-600 to-emerald-600"
          >
            <Download size={16} /> Download ATS Report
          </Button>
        </Panel>
      </div>

      {/* Analysis Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <ResultCard
          title="Strengths"
          icon={<CheckCircle className="text-success" />}
          items={result.strengths}
        />

        <ResultCard
          title="Weaknesses"
          icon={<AlertTriangle className="text-amber-400" />}
          items={result.weaknesses}
        />

        <ResultCard
          title="Suggestions"
          icon={<Lightbulb className="text-cyan-400" />}
          items={result.suggestions}
        />

        <ResultCard
          title="Matched Skills"
          icon={<CheckCircle className="text-emerald-400" />}
          items={result.matchedSkills}
        />

        <ResultCard
          title="Missing Skills"
          icon={<Target className="text-red-400" />}
          items={result.missingSkills}
        />

        <ResultCard
          title="Keywords To Add"
          icon={<Target className="text-violet-400" />}
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
    <Panel>
      <div className="mb-5 flex items-center gap-2">
        {icon}
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <ul className="space-y-3">
        {items?.length ? (
          items.map((item, index) => (
            <li key={index} className="text-sm text-muted-foreground">
              • {item}
            </li>
          ))
        ) : (
          <li className="text-sm text-muted-foreground">No data available</li>
        )}
      </ul>
    </Panel>
  );
}
