import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectorsSection } from "@/components/SectorsSection";

const Sectores = () => (
  <>
    <Navbar />
    <div className="pt-[72px]">
      <SectorsSection />
    </div>
    <Footer />
  </>
);

export default Sectores;
