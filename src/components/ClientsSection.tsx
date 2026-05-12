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
  if (width >= 1024) return 3;
  if (width >= 768) return 2;
  return 1;
};

export const ClientsSection = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(companies.length / visibleCount);

  const goTo = useCallback(
    (newPage: number, dir: number) => {
      if (newPage < 0 || newPage >= totalPages) return;
      setDirection(dir);
      setPage(newPage);
    },
    [totalPages]
  );

  const prev = () => goTo(page - 1, -1);
  const next = () => goTo(page + 1, 1);

  const visibleCompanies = companies.slice(
    page * visibleCount,
    page * visibleCount + visibleCount
  );

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

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
        <div className="flex items-center gap-4 md:gap-6">
          {/* Flecha izquierda — desktop al lado */}
          <button
            onClick={prev}
            aria-label={t("clients.prevAria", "Ver empresas anteriores")}
            disabled={page === 0}
            className={`hidden md:flex w-12 h-12 rounded-full border border-background/20 items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-mgaccent shrink-0 ${
              page === 0
                ? "opacity-40 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`${page}-${visibleCount}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5"
                style={{
                  gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
                }}
              >
                {visibleCompanies.map((company) => (
                  <div
                    key={company}
                    className="px-8 md:px-10 py-10 md:py-12 bg-background/[0.06] border border-background/10 hover:border-mgaccent hover:bg-background/10 transition-all duration-500 text-center group"
                  >
                    <div
                      className="font-head font-extrabold uppercase text-background tracking-tight leading-tight group-hover:text-mgaccent transition-colors duration-300"
                      style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}
                    >
                      {company}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flecha derecha — desktop al lado */}
          <button
            onClick={next}
            aria-label={t("clients.nextAria", "Ver empresas siguientes")}
            disabled={page >= totalPages - 1}
            className={`hidden md:flex w-12 h-12 rounded-full border border-background/20 items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-mgaccent shrink-0 ${
              page >= totalPages - 1
                ? "opacity-40 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Flechas móvil — debajo, centradas */}
        <div className="flex md:hidden justify-center gap-4 mt-6">
          <button
            onClick={prev}
            aria-label={t("clients.prevAria", "Ver empresas anteriores")}
            disabled={page === 0}
            className={`w-12 h-12 rounded-full border border-background/20 flex items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-mgaccent ${
              page === 0
                ? "opacity-40 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label={t("clients.nextAria", "Ver empresas siguientes")}
            disabled={page >= totalPages - 1}
            className={`w-12 h-12 rounded-full border border-background/20 flex items-center justify-center transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-mgaccent ${
              page >= totalPages - 1
                ? "opacity-40 pointer-events-none"
                : "text-background/60 hover:border-mgaccent hover:text-mgaccent"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex gap-2 justify-center mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > page ? 1 : -1)}
              aria-label={t("clients.dotAria", "Ir a página {{page}}", { page: i + 1 })}
              className={`transition-all duration-300 rounded-full ${
                i === page
                  ? "w-6 h-2 bg-mgaccent"
                  : "w-2 h-2 bg-background/25 hover:bg-background/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
