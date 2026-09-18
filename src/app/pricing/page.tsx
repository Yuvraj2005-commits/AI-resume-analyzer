import type { Metadata } from "next";
import Navbar from "@/components/dashboard/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, honest pricing for ResumeAI — start free with 3 analyses a month, upgrade to Pro for unlimited analyses and AI resume rewrites.",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pt-40 pb-28">
        <PricingSection />
      </section>

      <section id="faq" className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <FAQSection />
        </div>
      </section>

      <Footer />
    </main>
  );
}
