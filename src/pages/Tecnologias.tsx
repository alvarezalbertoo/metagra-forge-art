import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { TechSection } from "@/components/TechSection";
import { ProcessSection } from "@/components/ProcessSection";

const Tecnologias = () => (
  <>
    <CustomCursor />
    <Navbar />
    <div className="pt-[72px]">
      <TechSection />
      <ProcessSection />
    </div>
    <Footer />
  </>
);

export default Tecnologias;
