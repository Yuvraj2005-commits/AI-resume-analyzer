"use client";

import { signIn } from "next-auth/react";

export default function LoginButton() {
  return (
    <button
      onClick={() => signIn("google", {
        callbackUrl: "/dashboard",
      })}
      className="bg-black text-white px-4 py-2 rounded"
    >
      Sign In With Google
    </button>
  );
}