import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QualitySection } from "@/components/QualitySection";
import { StatsSection } from "@/components/StatsSection";

const Calidad = () => (
  <>
    <Navbar />
    <div className="pt-[72px]">
      <QualitySection />
      <StatsSection />
    </div>
    <Footer />
  </>
);

export default Calidad;
