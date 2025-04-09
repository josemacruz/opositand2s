"use client";

import Faq from "@/components/ui/Faq/Faq";
import Footer from "@/components/ui/Footer/Footer";
import Hero from "@/components/ui/Hero/Hero";
import Pricing from "@/components/ui/Pricing/Pricing";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <div className="mx-auto w-full max-w-7xl px-5">
        <Pricing />
        <Faq />
      </div>
      <Footer />
    </>
  );
}
