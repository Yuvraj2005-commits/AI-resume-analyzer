"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function UpgradeButton({ className }: { className?: string }) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [requested, setRequested] = useState(false);

  async function handleUpgrade() {
    if (!session?.user) {
      signIn("google", { callbackUrl: "/pricing" });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/upgrade-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      if (!res.ok) throw new Error("Request failed");

      setRequested(true);
      toast({
        variant: "success",
        title: "You're on the list",
        description: "We'll email you as soon as Pro checkout opens up.",
      });
    } catch {
      toast({
        variant: "error",
        title: "Something went wrong",
        description: "Couldn't send your upgrade request. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  if (requested) {
    return (
      <Button variant="secondary" size="xl" className={className} disabled>
        <Check /> Request received
      </Button>
    );
  }

  return (
    <Button
      variant="gradient"
      size="xl"
      className={className}
      onClick={handleUpgrade}
      disabled={loading}
    >
      {loading ? "Sending..." : "Upgrade to Pro"}
    </Button>
  );
}
