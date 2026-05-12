import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

const companies = [
  "Bosch",
  "Stellantis",
  "Volkswagen Group",
  "Renault Group",
  "Mercedes-Benz",
  "Ford Motor Company",
  "Volvo Group",
  "Nissan Motor",
  "Valeo",
  "ZF Group",
  "Magna International",
  "BorgWarner",
  "Adient",
  "Benteler",
  "GKN Automotive",
  "Nemak",
  "Vibracoustic",
  "CIE Automotive",
  "Sumiriko",
  "Facil",
  "Kautenik",
  "Inauxa",
  "Grupo Renault RVI",
];

const getVisibleCount = (width: number) => {
  if (width >= 1024) return 5;
  if (width >= 768) return 3;
  return 2;
};

export const ClientsSection = () => {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = companies.length - visibleCount;

  const prev = useCallback(() => {
    if (index <= 0) return;
    setDirection(-1);
    setIndex((i) => i - 1);
  }, [index]);

  const next = useCallback(() => {
    if (index >= maxIndex) return;
    setDirection(1);
    setIndex((i) => i + 1);
  }, [index, maxIndex]);

  const visibleCompanies = companies.slice(index, index + visibleCount);

  const stats = [
    { num: "30+", label: t("clients.stat1") },
    { num: "6", label: t("clients.stat2") },
    { num: "20+", label: t("clients.stat3") },
  ];

  return (
    <section className="bg-foreground text-background py-[120px] px-6 lg:px-[60px] overflow-hidden">
      {/* Encabezado */}
      <div className="text-center max-w-[780px] mx-auto mb-16">
        <div className="inline-flex items-center gap-3 mb-7 justify-center">
          <span className="w-7 h-[1px] bg-mgaccent" />
          <span className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-mgaccent">
            {t("clients.label")}
          </span>
          <span className="w-7 h-[1px] bg-mgaccent" />
        </div>

        <h2
          className="font-head font-extrabold uppercase text-background leading-[0.92] tracking-tight"
          style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
        >
          {t("clients.title1")}
          <br />
          <span className="text-mgaccent">{t("clients.title2")}</span>
        </h2>

        <p className="mt-6 text-background/65 text-[1rem] leading-relaxed font-light">
          {t("clients.subtitle")}
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-3 gap-[1px] bg-background/10 max-w-[640px] mx-auto mb-20">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center py-7 px-4 bg-foreground">
            <div
              className="font-head font-black text-background leading-none mb-1"
              style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)" }}
            >
              {stat.num}
            </div>
            <div className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-background/50">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Carrusel */}
      <div className="max-w-[1100px] mx-auto">
        <div className="flex items-center gap-6">
          {/* Flecha izquierda */}
          <button
            onClick={prev}
            aria-label={t("clients.prevAria", "Ver empresa anterior")}
            disabled={index === 0}
            className={`hidden md:flex w-12 h-12 rounded-full border border-background/20 items-center justify-center transition-all shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-mgaccent ${
              index === 0
                ? "opacity-30 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Lista de nombres */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              {visibleCompanies.map((company, i) => (
                <motion.div
                  key={company}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.04,
                  }}
                  className={`flex items-center justify-between py-5 group cursor-default ${
                    i < visibleCount - 1 ? "border-b border-background/10" : ""
                  }`}
                >
                  <span
                    className="font-head font-extrabold uppercase text-background/80 tracking-tight leading-none group-hover:text-mgaccent transition-colors duration-300"
                    style={{ fontSize: "clamp(1.3rem, 2vw, 1.9rem)" }}
                  >
                    {company}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-background/20 group-hover:text-mgaccent/50 transition-colors duration-300 hidden sm:block">
                    {String(index + i + 1).padStart(2, "0")}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Flecha derecha */}
          <button
            onClick={next}
            aria-label={t("clients.nextAria", "Ver empresa siguiente")}
            disabled={index >= maxIndex}
            className={`hidden md:flex w-12 h-12 rounded-full border border-background/20 items-center justify-center transition-all shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-mgaccent ${
              index >= maxIndex
                ? "opacity-30 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Flechas móvil */}
        <div className="flex md:hidden justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={index === 0}
            aria-label={t("clients.prevAria", "Ver empresa anterior")}
            className={`w-12 h-12 rounded-full border border-background/20 flex items-center justify-center transition-all ${
              index === 0
                ? "opacity-30 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            disabled={index >= maxIndex}
            aria-label={t("clients.nextAria", "Ver empresa siguiente")}
            className={`w-12 h-12 rounded-full border border-background/20 flex items-center justify-center transition-all ${
              index >= maxIndex
                ? "opacity-30 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progreso */}
        <div className="flex items-center gap-4 justify-center mt-10">
          <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-background/30">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="w-[160px] h-[1px] bg-background/15 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-mgaccent"
              animate={{ width: `${((index + visibleCount) / companies.length) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-background/30">
            {String(companies.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
};