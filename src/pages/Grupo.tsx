import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { motion } from "framer-motion";
import { SMOOTH_EASE } from "@/lib/animations";

const Grupo = () => (
  <>
    <Navbar />
    <div className="pt-[72px]">
      <section className="bg-mgbg px-6 lg:px-[60px] py-[120px] relative z-[2]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: SMOOTH_EASE }}>
          <div className="section-label">Sobre Nosotros</div>
          <h1 className="font-head font-black text-foreground uppercase leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
            Metagra<br /><span className="text-outline">Group</span>
          </h1>
          <p className="mt-8 text-lg text-mgsteel font-light max-w-2xl leading-relaxed">
            Desde 1970, Metagra Group ha sido un pilar de la industria de estampación en frío en el País Vasco.
            Con sede en Bergara, Gipuzkoa, y presencia en México, servimos a los principales fabricantes de automoción del mundo.
          </p>
        </motion.div>
      </section>
      <AboutSection />
    </div>
    <Footer />
  </>
);

export default Grupo;
