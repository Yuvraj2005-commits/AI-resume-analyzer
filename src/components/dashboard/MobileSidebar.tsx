"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, LayoutDashboard, History, User, CreditCard } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import LogoutButton from "@/components/LogoutButton";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "History", href: "/history", icon: History },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Pricing", href: "/pricing", icon: CreditCard },
];

export default function MobileSidebar() {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="rounded-xl border border-border p-2 text-foreground">
            <Menu />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="bg-sidebar text-foreground">
          <SheetTitle className="px-4 pt-4">ResumeAI</SheetTitle>

          <div className="mt-4 space-y-2 px-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    active
                      ? "border border-violet-500/30 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 px-4">
            <LogoutButton />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
