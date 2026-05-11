import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { revealVariants } from "@/lib/animations";
import { SectionLabel } from "@/components/SectionLabel";

export const GlobalPresenceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="presencia-global" className="bg-mgbg3 py-[140px] px-6 lg:px-[60px] relative z-[2] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
        >
          <SectionLabel>{t("global.label")}</SectionLabel>

          {/* Titular en español */}
          <h2
            className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
          >
            Donde está<br />
            <span className="text-mgaccent">nuestro cliente</span>
          </h2>

          <p
            className="mt-8 text-mgsteel text-[1rem] leading-relaxed font-light max-w-[480px]"
            dangerouslySetInnerHTML={{ __html: t("global.desc") }}
          />

          {/* Sedes — consistentes (las dos con su ubicación), SIN líneas separadoras */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-12">
            <div>
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-2">
                España
              </div>
              <div className="font-head font-bold uppercase text-foreground text-[1.05rem] mb-1">
                Sede principal
              </div>
              <div className="text-mgsteel text-[0.9rem] font-light">
                Bergara, Gipuzkoa
              </div>
            </div>
            <div>
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-2">
                México
              </div>
              <div className="font-head font-bold uppercase text-foreground text-[1.05rem] mb-1">
                Planta productiva
              </div>
              <div className="text-mgsteel text-[0.9rem] font-light">
                Guanajuato, Gto.
              </div>
            </div>
          </div>

          <Link
            to="/grupo"
            className="mt-12 font-head font-bold uppercase text-[0.85rem] tracking-[0.2em] text-mgaccent hover:gap-3 inline-flex items-center gap-2 transition-all"
          >
            {t("global.cta")} <ArrowRight size={14} />
          </Link>
        </motion.div>

        {/* Imagen — sin label superpuesto cuadrado, más limpia */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={revealVariants}
          custom={1}
          className="relative"
        >
          {/* TODO: foto real planta México */}
          <div className="group relative overflow-hidden aspect-[4/5]">
            <img
              src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1200&q=80"
              alt="Planta Metagra México"
              className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />

            {/* Texto integrado en la imagen, sin caja con borde */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-white/80 mb-2">
                Guanajuato · México
              </div>
              <div className="font-head font-bold text-white text-[1.4rem] uppercase tracking-wide leading-tight drop-shadow-lg">
                Parque Industrial<br />La Amistad
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
