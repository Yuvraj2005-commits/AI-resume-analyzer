"use client";
import LogoutButton from "@/components/LogoutButton";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sparkles,
  LayoutDashboard,
  FileText,
  History,
  User,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Analyze",
    href: "/dashboard",
    icon: FileText,
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
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-72 min-h-screen bg-[#09090f] border-r border-white/10 flex-col">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">ResumeAI</h1>

            <p className="text-xs text-gray-500">Career Intelligence</p>
          </div>
        </div>
      </div>

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
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border border-violet-500/30 text-white"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
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
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 p-5">
          <h3 className="font-bold text-lg">ResumeAI Pro</h3>

          <p className="text-sm text-white/80 mt-2">
            Improve ATS scores and get AI-powered resume insights.
          </p>
        </div>
      </div>
      <div className="flex flex-col h-screen">
        {/* Logo */}
        {/* Navigation */}

        <div className="mt-auto p-6 border-t border-white/10">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}
