"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileSidebar() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-2 rounded-xl border border-white/10">
            <Menu />
          </button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="bg-black text-white"
        >
          <div className="space-y-6 mt-8">
            <Link href="/dashboard">
              Dashboard
            </Link>

            <Link href="/history">
              History
            </Link>

            <Link href="/profile">
              Profile
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}