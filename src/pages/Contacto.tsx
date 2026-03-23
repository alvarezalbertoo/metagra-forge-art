import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";

const Contacto = () => (
  <>
    <Navbar />
    <div className="pt-[72px]">
      <ContactSection />
    </div>
    <Footer />
  </>
);

export default Contacto;
