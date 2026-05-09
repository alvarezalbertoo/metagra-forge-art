import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { revealVariants } from "@/lib/animations";

export const GlobalPresenceSection = () => {
  const { t } = useTranslation();

  return (
    <section id="presencia-global" className="bg-mgbg3 py-[120px] px-6 lg:px-[60px] relative z-[2] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealVariants}>
          <div className="section-label">{t("global.label")}</div>
          <h2 className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
            BE WHERE OUR<br />
            <span className="text-outline-accent">CUSTOMER IS</span>
          </h2>
          <div className="w-10 h-[3px] bg-mgaccent my-7" />
          <p className="text-mgsteel text-[0.95rem] leading-relaxed font-light max-w-[480px]" dangerouslySetInnerHTML={{ __html: t("global.desc") }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-10">
            <div>
              <div className="border-t border-mgaccent w-12 mb-3" />
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-1">España · Bergara</div>
              <div className="font-head font-bold uppercase text-foreground mb-1">Sede principal</div>
              <div className="text-mgsteel text-[0.85rem]">Desde 1970</div>
            </div>
            <div>
              <div className="border-t border-mgaccent w-12 mb-3" />
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-1">México · Guanajuato</div>
              <div className="font-head font-bold uppercase text-foreground mb-1">Planta productiva</div>
              <div className="text-mgsteel text-[0.85rem]">Parque Ind. La Amistad</div>
            </div>
          </div>

          <Link to="/grupo" className="mt-10 font-head font-bold uppercase text-[0.85rem] tracking-[0.2em] text-mgaccent hover:gap-3 inline-flex items-center gap-2 transition-all">
            {t("global.cta")} <ArrowRight size={14} />
          </Link>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={revealVariants} custom={1} className="relative">
          {/* TODO: foto real planta México */}
          <img
            src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&w=1200&q=80"
            alt="Planta Metagra México"
            className="aspect-[4/5] w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute bottom-6 left-6 bg-mgbg/90 backdrop-blur-sm border border-border px-5 py-4">
            <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-1">
              Guanajuato · México
            </div>
            <div className="font-head font-bold text-foreground text-[0.95rem] uppercase tracking-wide">
              Parque Industrial<br />La Amistad
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
