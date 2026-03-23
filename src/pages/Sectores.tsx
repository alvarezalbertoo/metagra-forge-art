import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { SectorsSection } from "@/components/SectorsSection";

const Sectores = () => (
  <>
    <CustomCursor />
    <Navbar />
    <div className="pt-[72px]">
      <SectorsSection />
    </div>
    <Footer />
  </>
);

export default Sectores;
