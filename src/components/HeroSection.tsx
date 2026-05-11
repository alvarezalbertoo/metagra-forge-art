import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { fadeUp, stagger } from "@/lib/animations";

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="main-content" aria-label="Inicio"className="relative min-h-screen flex items-stretch overflow-hidden bg-mgbg">
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
            <span className="w-7 h-[1px] bg-mgaccent" />
            <span className="font-mono text-[0.7rem] text-mgaccent tracking-[0.2em] uppercase">
              {t("hero.tagline")}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-head font-black text-foreground uppercase leading-[0.92] tracking-tight"
            style={{ fontSize: "clamp(3.4rem, 6.5vw, 6.8rem)" }}
          >
            {t("hero.title1")}<br />{t("hero.title2")}{" "}
            <span className="text-mgaccent">{t("hero.title3")}</span>
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

        {/* LADO DERECHO — composición visual industrial con duotono navy */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0">
            {/* TODO: foto real Metagra (pieza/máquina/forja) */}
            <img
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1400&q=85"
              alt="Instalaciones industriales de fabricación de piezas metálicas por estampación en frío"
              className="w-full h-full object-cover grayscale contrast-125 brightness-90"
              loading="eager"
            />
            {/* Capa 1: tinte navy fuerte para integrar con la marca */}
            <div className="absolute inset-0 bg-mgaccent/30 mix-blend-multiply" />
            {/* Capa 2: degradado del lado izquierdo (donde va el texto) */}
            <div className="absolute inset-0 bg-gradient-to-r from-mgbg via-mgbg/70 to-mgbg/10" />
            {/* Capa 3: viñeta inferior */}
            <div className="absolute inset-0 bg-gradient-to-t from-mgbg/40 to-transparent" />
          </div>
        </div>
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
