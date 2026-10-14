import CtaBanner from "@/components/landing/CtaBanner";
import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingFooter from "@/components/landing/LandingFooter";
import Pricing from "@/components/landing/Pricing";
import Showcase from "@/components/landing/Showcase";
import WhyChoose from "@/components/landing/WhyChoose";

export default function HomePage() {
  return (
    <main className="overflow-x-hidden bg-paper">
      <Hero />
      <Features />
      <HowItWorks />
      <WhyChoose />
      <Showcase />
      <Pricing />
      <CtaBanner />
      <LandingFooter />
    </main>
  );
}
