import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TechSection } from "@/components/TechSection";
import { ProcessSection } from "@/components/ProcessSection";

const Tecnologias = () => (
  <>
    <Navbar />
    <div className="pt-[72px]">
      <TechSection />
      <ProcessSection />
    </div>
    <Footer />
  </>
);

export default Tecnologias;
