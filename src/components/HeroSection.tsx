import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger, SMOOTH_EASE } from "@/lib/animations";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="inicio" className="relative min-h-screen flex items-stretch overflow-hidden bg-mgbg">
      {/* Fondo base */}
      <div className="absolute inset-0 bg-gradient-to-br from-mgbg via-mgbg2 to-mgbg3" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(52,73,100,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(52,73,100,0.08) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Línea acento izquierda */}
      <div
        className="absolute left-0 bottom-0 w-[3px] h-[55%] z-[3]"
        style={{ background: "linear-gradient(to top, #344964, transparent)" }}
      />

      {/* Wordmark gigante de fondo */}
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-[-40px] lg:bottom-[-80px] pointer-events-none select-none overflow-hidden w-full"
        style={{ zIndex: 1 }}
      >
        <div
          className="font-head font-black uppercase leading-none tracking-tighter text-foreground/[0.04] dark:text-foreground/[0.06] whitespace-nowrap text-right pr-6 lg:pr-[60px]"
          style={{ fontSize: "clamp(10rem, 24vw, 28rem)" }}
        >
          METAGRA
        </div>
      </div>

      {/* Contenedor principal split 55/45 */}
      <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] w-full">
        {/* LADO IZQUIERDO — texto */}
        <motion.div
          className="flex flex-col justify-center px-6 lg:px-[60px] py-32 lg:py-32 max-w-[760px]"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-7">
            <span className="font-mono text-[0.8rem] text-mgaccent tracking-[0.2em]">01</span>
            <span className="w-7 h-[1px] bg-mgaccent" />
            <span className="font-mono text-[0.7rem] text-mgaccent tracking-[0.2em] uppercase">
              {t("hero.tagline")}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-head font-black text-foreground uppercase leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(4rem, 8vw, 8.5rem)" }}
          >
            {t("hero.title1")}<br />{t("hero.title2")}{" "}
            <span className="text-outline-accent">{t("hero.title3")}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 font-head font-semibold text-mgaccent uppercase tracking-[0.18em] text-[0.95rem] lg:text-[1.05rem]"
          >
            {t("hero.subTagline")}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-7 text-base font-light leading-relaxed text-mgsteel max-w-[520px]"
            dangerouslySetInnerHTML={{ __html: t("hero.desc") }}
          />

          <motion.div variants={fadeUp} className="mt-11 flex flex-wrap gap-4 items-center">
            <Link
              to="/tecnologias"
              className="relative overflow-hidden font-head font-bold text-[0.85rem] tracking-[0.2em] uppercase px-9 py-4 bg-mgaccent text-white hover:-translate-y-0.5 transition-transform group"
            >
              <span className="absolute inset-0 bg-mgaccent2 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <span className="relative z-[1]">{t("hero.cta1")}</span>
            </Link>
            <Link
              to="/contacto"
              className="font-head font-semibold text-[0.85rem] tracking-[0.2em] uppercase px-9 py-4 border border-border text-mgsteel hover:border-foreground hover:text-foreground transition-all"
            >
              {t("hero.cta2")}
            </Link>
          </motion.div>
        </motion.div>

        {/* LADO DERECHO — composición visual */}
        <div className="relative hidden lg:block">
          {/* Imagen industrial a sangre */}
          <div className="absolute inset-0">
            {/* TODO: foto real Metagra (pieza/máquina/forja) */}
            <img
              src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=85"
              alt="Estampación en frío Metagra"
              className="w-full h-full object-cover grayscale-[35%] contrast-110"
              loading="eager"
            />
            {/* Gradient para integrar con la izquierda */}
            <div className="absolute inset-0 bg-gradient-to-r from-mgbg via-mgbg/40 to-transparent" />
            {/* Tinte navy */}
            <div className="absolute inset-0 bg-mgaccent/[0.08] mix-blend-multiply" />
          </div>

          {/* Card flotante 1 — KPI principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, ease: SMOOTH_EASE }}
            className="absolute top-[100px] right-[40px] xl:right-[60px] bg-mgbg/90 backdrop-blur-md border border-border px-6 py-5 max-w-[220px]"
          >
            <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-1">
              {t("hero.stat1")}
            </div>
            <div className="font-head font-black text-foreground text-[2.6rem] leading-none">
              50<span className="text-mgaccent">+</span>
            </div>
            <div className="font-mono text-[0.7rem] uppercase tracking-wide text-mgsteel mt-1">
              {t("hero.tagline")}
            </div>
          </motion.div>

          {/* Card flotante 2 — Sedes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: SMOOTH_EASE }}
            className="absolute bottom-[120px] left-[40px] xl:left-[60px] bg-foreground text-background px-6 py-5"
          >
            <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-1">
              {t("hero.stat2")}
            </div>
            <div className="font-head font-bold text-[1rem] uppercase tracking-wide leading-tight">
              Bergara<br />Guanajuato
            </div>
            <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-background/60 mt-2">
              ES · MX
            </div>
          </motion.div>

          {/* Línea blueprint decorativa */}
          <svg
            className="absolute top-1/2 right-0 w-32 h-[1px] -translate-y-1/2 text-mgaccent/40"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
          >
            <line x1="0" y1="0.5" x2="100" y2="0.5" stroke="currentColor" strokeDasharray="2 4" />
          </svg>
        </div>

        {/* Card móvil — Presencia (solo mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: SMOOTH_EASE }}
          className="lg:hidden mx-6 mb-16 -mt-8 bg-foreground text-background px-6 py-5 self-start"
        >
          <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-1">
            {t("hero.stat2")}
          </div>
          <div className="font-head font-bold text-[1rem] uppercase tracking-wide leading-tight">
            Bergara · Guanajuato
          </div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-background/60 mt-2">
            ES · MX
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-[30px] left-[60px] z-[3] hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div
          className="w-[1px] h-12"
          style={{
            background: "linear-gradient(to bottom, #344964, transparent)",
            animation: "scrollPulse 1.8s ease-in-out infinite",
          }}
        />
        <span
          className="font-mono text-[0.6rem] tracking-[0.2em] text-mgmuted"
          style={{ writingMode: "vertical-lr" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  );
};
