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
            Más de cinco décadas de trabajo al servicio de la vanguardia tecnológica en la producción de piezas para automoción.
            Desde nuestra sede en Bergara, Gipuzkoa, y con presencia en México, ponemos a disposición de nuestros clientes una experiencia consolidada en estampación en frío de alambrón de acero, mecanizado y roscado de piezas metálicas.
          </p>
          <p className="mt-6 text-lg text-mgsteel font-light max-w-2xl leading-relaxed">
            Factores como el <strong className="text-foreground font-medium">desarrollo de utillaje propio</strong> y la gestión integral de tratamientos nos convierten en un referente del sector. Reconocidos como <strong className="text-foreground font-medium">mejor proveedor mundial de PSA</strong>, <strong className="text-foreground font-medium">preferred supplier de Bosch</strong> y ganadores del <strong className="text-foreground font-medium">premio a la calidad de Renault</strong>.
          </p>
        </motion.div>
      </section>
      <AboutSection />
    </div>
    <Footer />
  </>
);

export default Grupo;
