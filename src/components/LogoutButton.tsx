"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        bg-red-500/10
        border
        border-red-500/20
        py-3
        text-red-400
        hover:bg-red-500/20
        transition
      "
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}