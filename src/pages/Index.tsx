import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { HeroSection } from "@/components/HeroSection";
import { MarqueeBand } from "@/components/MarqueeBand";
import { AboutSection } from "@/components/AboutSection";
import { GlobalPresenceSection } from "@/components/GlobalPresenceSection";
import { TechSection } from "@/components/TechSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";
import { SectorsSection } from "@/components/SectorsSection";
import { QualitySection } from "@/components/QualitySection";
import { CertificacionesSection } from "@/components/CertificacionesSection";
import { DescargasSection } from "@/components/DescargasSection";
import { ContactSection } from "@/components/ContactSection";
import { BrandClosingSection } from "@/components/BrandClosingSection";
import { PullQuote } from "@/components/PullQuote";
import { CinematicBleed } from "@/components/CinematicBleed";

const Index = () => {
  return (
    <>
      
      <Navbar />
      <HeroSection />
      <MarqueeBand />
      <AboutSection />
      <GlobalPresenceSection />
      <CinematicBleed />
      <TechSection />
      <ProcessSection />
      <StatsSection />
      <PullQuote />
      <SectorsSection />
      <QualitySection />
      <CertificacionesSection />
      <DescargasSection />
      <ContactSection />
      <BrandClosingSection />
      <Footer />
    </>
  );
};

export default Index;
