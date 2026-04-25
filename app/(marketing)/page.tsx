import { Hero } from "@/components/marketing/hero"
import { Features } from "@/components/marketing/features"
import { Stats } from "@/components/marketing/stats"
import { CtaSection } from "@/components/marketing/cta-section"

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <CtaSection />
    </>
  )
}
