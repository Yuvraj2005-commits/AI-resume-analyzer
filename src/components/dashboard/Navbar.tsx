import Link from "next/link";
import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold"
        >
          Resume
          <span className="text-violet-500">
            AI
          </span>
        </Link>

        <nav className="hidden md:flex gap-8 text-zinc-400">
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="
              px-5
              py-2
              rounded-xl
              bg-violet-600
              hover:bg-violet-700
              transition
              "
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