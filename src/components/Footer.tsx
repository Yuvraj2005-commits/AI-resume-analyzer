import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-10 md:flex-row md:justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
          <Sparkles className="text-violet-500" size={18} />
          ResumeAI
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <Link href="/#features" className="transition hover:text-foreground">
            Features
          </Link>
          <Link href="/pricing" className="transition hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#faq" className="transition hover:text-foreground">
            FAQ
          </Link>
          <Link href="/dashboard" className="transition hover:text-foreground">
            Dashboard
          </Link>
        </nav>

        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ResumeAI · Built with Next.js, MongoDB & Gemini AI
        </p>
      </div>
    </footer>
  );
}
