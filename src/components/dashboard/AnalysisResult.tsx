"use client";

import jsPDF from "jspdf";

interface Props {
  result: any;
}

export default function AnalysisResult({ result }: Props) {
  const downloadReport = () => {
    const doc = new jsPDF();

    let y = 20;

    doc.setFontSize(20);
    doc.text("AI Resume Analysis Report", 20, y);

    y += 20;

    doc.setFontSize(14);
    doc.text(`ATS Score: ${result.atsScore}`, 20, y);

    y += 10;

    doc.text(`Job Match: ${result.jobMatch}%`, 20, y);

    y += 20;

    doc.text("Strengths:", 20, y);
    y += 10;

    result.strengths?.forEach((item: string) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("Weaknesses:", 20, y);
    y += 10;

    result.weaknesses?.forEach((item: string) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });

    y += 10;

    doc.text("Suggestions:", 20, y);
    y += 10;

    result.suggestions?.forEach((item: string) => {
      doc.text(`• ${item}`, 25, y);
      y += 8;
    });

    y += 10;

    if (result.missingSkills?.length) {
      doc.text("Missing Skills:", 20, y);
      y += 10;

      result.missingSkills.forEach((item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
      });
    }

    y += 10;

    if (result.keywordsToAdd?.length) {
      doc.text("Keywords To Add:", 20, y);
      y += 10;

      result.keywordsToAdd.forEach((item: string) => {
        doc.text(`• ${item}`, 25, y);
        y += 8;
      });
    }

    doc.save("ATS-Report.pdf");
  };

  return (
    <div className="mt-8 space-y-6">
      <button
        onClick={downloadReport}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Download Report
      </button>

      <div className="border rounded-xl p-6">
        <h2 className="text-3xl font-bold">
          ATS Score: {result.atsScore}
        </h2>

        <p className="mt-2 text-lg">
          Job Match: {result.jobMatch}%
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-xl mb-4">
            Strengths
          </h3>

          <ul className="space-y-2">
            {result.strengths?.map((item: string) => (
              <li key={item}> {item}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-xl mb-4">
            Weaknesses
          </h3>

          <ul className="space-y-2">
            {result.weaknesses?.map((item: string) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-xl mb-4">
            Suggestions
          </h3>

          <ul className="space-y-2">
            {result.suggestions?.map((item: string) => (
              <li key={item}> {item}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-xl mb-4">
            Missing Skills
          </h3>

          <ul className="space-y-2">
            {result.missingSkills?.map((item: string) => (
              <li key={item}> {item}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-xl p-5">
          <h3 className="font-bold text-xl mb-4">
            Keywords To Add
          </h3>

          <ul className="space-y-2">
            {result.keywordsToAdd?.map((item: string) => (
              <li key={item}> {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}