import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";

export const BrandClosingSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-foreground text-background relative overflow-hidden py-[100px] lg:py-[140px] px-6 lg:px-[60px]">
      {/* Wordmark METAGRA gigante en la parte INFERIOR (no centrado, así no choca con el texto) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[-2vw] pointer-events-none select-none whitespace-nowrap text-center"
      >
        <span
          className="font-head font-black uppercase tracking-tighter leading-none text-background/[0.06] block"
          style={{ fontSize: "clamp(7rem, 18vw, 22rem)" }}
        >
          METAGRA
        </span>
      </div>

      {/* Contenido al frente, centrado en la parte superior */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-[2] max-w-[720px] mx-auto text-center"
      >
        <div className="font-mono text-[0.7rem] tracking-[0.3em] uppercase text-background/60 mb-6">
          {t("closing.label")}
        </div>
        <h2
          className="font-head font-extrabold uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
        >
          {t("closing.title1")}
          <br />
          <span className="text-mgaccent">{t("closing.title2")}</span>
        </h2>
        <p className="mt-7 text-background/70 text-[0.95rem] leading-relaxed font-light max-w-[560px] mx-auto">
          {t("closing.desc")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Link
            to="/contacto"
            className="font-head font-bold text-[0.85rem] tracking-[0.2em] uppercase px-9 py-4 bg-mgaccent text-white hover:-translate-y-0.5 transition-transform inline-flex items-center gap-3"
          >
            {t("closing.cta")} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-background/10 font-mono text-[0.68rem] tracking-[0.25em] uppercase text-background/50">
          BERGARA · GIPUZKOA &nbsp;&nbsp;✦&nbsp;&nbsp; GUANAJUATO · MÉXICO
        </div>
      </motion.div>
    </section>
  );
};
