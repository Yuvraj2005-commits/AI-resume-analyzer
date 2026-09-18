import Link from "next/link";
import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-3xl font-bold text-foreground">
          Resume
          <span className="text-violet-500">AI</span>
        </Link>

        <nav className="hidden gap-8 text-muted-foreground md:flex">
          <Link href="/#features" className="transition hover:text-foreground">
            Features
          </Link>
          <Link href="/pricing" className="transition hover:text-foreground">
            Pricing
          </Link>
          <Link href="/#faq" className="transition hover:text-foreground">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="rounded-xl bg-violet-600 px-5 py-2 text-white transition hover:bg-violet-700"
            >
              Dashboard
            </Link>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
}