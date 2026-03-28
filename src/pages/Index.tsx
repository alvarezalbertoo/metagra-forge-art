import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { HeroSection } from "@/components/HeroSection";
import { MarqueeBand } from "@/components/MarqueeBand";
import { AboutSection } from "@/components/AboutSection";
import { TechSection } from "@/components/TechSection";
import { ProcessSection } from "@/components/ProcessSection";
import { StatsSection } from "@/components/StatsSection";
import { SectorsSection } from "@/components/SectorsSection";
import { QualitySection } from "@/components/QualitySection";
import { CertificacionesSection } from "@/components/CertificacionesSection";
import { DescargasSection } from "@/components/DescargasSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <>
      
      <Navbar />
      <HeroSection />
      <MarqueeBand />
      <AboutSection />
      <TechSection />
      <ProcessSection />
      <StatsSection />
      <SectorsSection />
      <QualitySection />
      <CertificacionesSection />
      <DescargasSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Index;
