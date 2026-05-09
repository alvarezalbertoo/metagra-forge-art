import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { revealVariants } from "@/lib/animations";
import { useState } from "react";
import { Car, Train, Factory } from "lucide-react";

const patterns = [
  { pattern: "repeating-linear-gradient(45deg, #344964 0, #344964 1px, transparent 0, transparent 50%)", patternSize: "20px 20px" },
  { pattern: "radial-gradient(circle at 50% 50%, rgba(52,73,100,0.3) 0%, transparent 60%)" },
  { pattern: "repeating-conic-gradient(rgba(52,73,100,0.08) 0deg, transparent 10deg, transparent 30deg)" },
];

export const SectorsSection = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const sectors = [
    { icon: Car, tag: t("sectors.s1Tag"), title: t("sectors.s1Title"), desc: t("sectors.s1Desc"), ...patterns[0] },
    { icon: Train, tag: t("sectors.s2Tag"), title: t("sectors.s2Title"), desc: t("sectors.s2Desc"), ...patterns[1] },
    { icon: Factory, tag: t("sectors.s3Tag"), title: t("sectors.s3Title"), desc: t("sectors.s3Desc"), ...patterns[2] },
  ];

  const current = sectors[active];

  return (
    <section id="clientes" className="bg-mgbg2 px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-[72px]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}>
          <div className="section-label">{t("sectors.label")}</div>
          <h2 className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
            {t("sectors.title1")}<br /><span className="text-outline">{t("sectors.title2")}</span>
          </h2>
        </motion.div>
        <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={revealVariants} className="text-mgsteel text-[0.95rem] leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: t("sectors.desc") }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[2px] border border-border bg-mgbg3">
        <div className="lg:col-span-4 flex flex-col">
          {sectors.map((sector, i) => {
            const isActive = i === active;
            return (
              <button
                key={sector.title}
                onClick={() => setActive(i)}
                className={`relative text-left p-7 border-b border-border last:border-b-0 transition-all duration-300 group ${isActive ? "bg-mgsurface" : "bg-mgbg2 hover:bg-mgsurface/60"}`}
              >
                <span className={`absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-300 ${isActive ? "bg-mgaccent" : "bg-transparent"}`} />
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${isActive ? "border-mgaccent bg-mgaccent/10" : "border-border"}`}>
                    <sector.icon className="w-5 h-5 text-mgaccent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-mgaccent mb-1">{sector.tag}</div>
                    <h3 className="font-head font-extrabold text-[1.15rem] uppercase tracking-[0.05em] text-foreground">{sector.title}</h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-8 relative min-h-[420px] overflow-hidden bg-gradient-to-br from-mgsurface to-mgbg"
        >
          <div
            className="absolute inset-0 opacity-[0.22]"
            style={{ background: current.pattern, ...(current.patternSize ? { backgroundSize: current.patternSize } : {}) }}
          />
          <div className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-end bg-gradient-to-t from-mgbg/90 via-mgbg/40 to-transparent">
            <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase text-mgaccent mb-3">{String(active + 1).padStart(2, "0")} / {String(sectors.length).padStart(2, "0")}</div>
            <h3 className="font-head font-extrabold text-[2.2rem] lg:text-[2.8rem] uppercase tracking-tight text-foreground mb-4">{current.title}</h3>
            <p className="text-[0.95rem] text-mgsteel leading-relaxed max-w-[640px]">{current.desc}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
