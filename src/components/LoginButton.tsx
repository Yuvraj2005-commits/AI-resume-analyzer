"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard",
        })
      }
      className="
      px-5
      py-2
      rounded-xl
      border
      border-zinc-700
      hover:bg-zinc-900
      transition
      "
    >
      Continue with Google
    </button>
  );
}