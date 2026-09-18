"use client";
import LogoutButton from "@/components/LogoutButton";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sparkles,
  LayoutDashboard,
  History,
  User,
  CreditCard,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "History",
    href: "/history",
    icon: History,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Pricing",
    href: "/pricing",
    icon: CreditCard,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      {/* Logo */}
      <Link href="/" className="border-b border-sidebar-border px-8 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500">
            <Sparkles className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-foreground">ResumeAI</h1>
            <p className="text-xs text-muted-foreground">Career Intelligence</p>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-4 py-4 transition-all duration-300 ${
                  active
                    ? "border border-violet-500/30 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <Icon size={22} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Card */}
      <div className="p-5">
        <Link
          href="/pricing"
          className="block rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-5 transition hover:brightness-110"
        >
          <h3 className="text-lg font-bold text-white">ResumeAI Pro</h3>
          <p className="mt-2 text-sm text-white/80">
            Unlimited analyses and AI resume rewrites.
          </p>
        </Link>
      </div>

      <div className="border-t border-sidebar-border p-6">
        <LogoutButton />
      </div>
    </aside>
  );
}
