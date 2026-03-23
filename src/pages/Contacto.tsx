import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { ContactSection } from "@/components/ContactSection";

const Contacto = () => (
  <>
    <CustomCursor />
    <Navbar />
    <div className="pt-[72px]">
      <ContactSection />
    </div>
    <Footer />
  </>
);

export default Contacto;
