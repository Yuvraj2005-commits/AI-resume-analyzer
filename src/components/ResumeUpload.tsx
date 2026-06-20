"use client";

import { useState } from "react";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);

  const uploadResume = async () => {
    if (!file) return;

    const formData = new FormData();

    formData.append("resume", file);
    formData.append("role", "Frontend Developer");
    formData.append("email", "yuvrajprakash0612@gmail.com");

    const res = await fetch("/api/upload-resume", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();

      console.error("Upload failed:");
      console.error(errorText);

      return;
    }

    const data = await res.json();

    console.log("Success:", data);
  };

  return (
    <div className="mt-10">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={uploadResume}
        className="bg-blue-500 text-white px-4 py-2 ml-4 rounded"
      >
        Upload Resume
      </button>
    </div>
  );
}
