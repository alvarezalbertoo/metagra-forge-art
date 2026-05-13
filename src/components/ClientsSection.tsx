import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

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

export const ClientsSection = () => {
  const { t } = useTranslation();

  const stats = [
    { num: "30+", label: t("clients.stat1") },
    { num: "6", label: t("clients.stat2") },
    { num: "20+", label: t("clients.stat3") },
  ];

  // Duplicamos para loop infinito
  const items = [...companies, ...companies];

  return (
    <section className="bg-foreground text-background py-[120px] overflow-hidden">
      {/* Encabezado */}
      <div className="text-center max-w-[780px] mx-auto mb-16 px-6 lg:px-[60px]">
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
      <div className="grid grid-cols-3 gap-[1px] bg-background/10 max-w-[640px] mx-auto mb-20 px-6 lg:px-0">
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

      {/* Ticker fila 1 — izquierda */}
      <div className="relative w-full mb-4">
        {/* Fade izquierda */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
        {/* Fade derecha */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 gap-0"
            style={{
              animation: "ticker-left 40s linear infinite",
            }}
          >
            {items.map((company, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center shrink-0"
              >
                <span
                  className="font-head font-extrabold uppercase text-background/75 tracking-tight whitespace-nowrap px-8 hover:text-mgaccent transition-colors duration-300 cursor-default"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
                >
                  {company}
                </span>
                <span className="text-mgaccent/40 text-[1.2rem] shrink-0">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker fila 2 — derecha (sentido contrario) */}
      <div className="relative w-full mt-4">
        {/* Fade izquierda */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-foreground to-transparent z-10 pointer-events-none" />
        {/* Fade derecha */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-foreground to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div
            className="flex shrink-0 gap-0"
            style={{
              animation: "ticker-right 40s linear infinite",
            }}
          >
            {[...items].reverse().map((company, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center shrink-0"
              >
                <span
                  className="font-head font-extrabold uppercase text-background/40 tracking-tight whitespace-nowrap px-8 hover:text-mgaccent hover:text-background/75 transition-colors duration-300 cursor-default"
                  style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)" }}
                >
                  {company}
                </span>
                <span className="text-mgaccent/20 text-[1.2rem] shrink-0">·</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes ticker-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-left, .ticker-right { animation: none; }
        }
      `}</style>
    </section>
  );
};