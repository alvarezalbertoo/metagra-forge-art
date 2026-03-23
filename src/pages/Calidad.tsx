import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { QualitySection } from "@/components/QualitySection";
import { StatsSection } from "@/components/StatsSection";

const Calidad = () => (
  <>
    <CustomCursor />
    <Navbar />
    <div className="pt-[72px]">
      <QualitySection />
      <StatsSection />
    </div>
    <Footer />
  </>
);

export default Calidad;
