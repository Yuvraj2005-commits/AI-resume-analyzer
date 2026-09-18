import type { Metadata } from "next";
import Providers from "@/components/providers";
import { ToastProvider } from "@/components/ui/toast";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "ResumeAI — AI-Powered Resume Analyzer & ATS Optimizer",
    template: "%s • ResumeAI",
  },
  description:
    "Analyze your resume against any job description, fix ATS issues, close skill gaps, and generate an ATS-friendly resume with Gemini AI.",
  metadataBase: new URL("https://ai-resume-analyzer-52.vercel.app"),
  openGraph: {
    title: "ResumeAI — AI-Powered Resume Analyzer & ATS Optimizer",
    description:
      "Analyze your resume against any job description, fix ATS issues, close skill gaps, and generate an ATS-friendly resume with Gemini AI.",
    siteName: "ResumeAI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark font-sans", geist.variable)}>
      <body>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}