import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { revealVariants } from "@/lib/animations";

export const ProcessSection = () => {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);

  const steps = [
    { num: "01", title: t("process.s1Title"), desc: t("process.s1Desc") },
    { num: "02", title: t("process.s2Title"), desc: t("process.s2Desc") },
    { num: "03", title: t("process.s3Title"), desc: t("process.s3Desc") },
    { num: "04", title: t("process.s4Title"), desc: t("process.s4Desc") },
    { num: "05", title: t("process.s5Title"), desc: t("process.s5Desc") },
    { num: "06", title: t("process.s6Title"), desc: t("process.s6Desc") },
  ];

  const nextStep = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, [steps.length]);

  useEffect(() => {
    const interval = setInterval(nextStep, 2800);
    return () => clearInterval(interval);
  }, [nextStep]);

  return (
    <section id="procesos" className="bg-mgbg2 border-t border-b border-border px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-[100px] items-start">
        <div className="lg:sticky lg:top-[120px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}>
            <div className="section-label">{t("process.label")}</div>
            <h2 className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
              {t("process.title1")}<br /><span className="text-outline">{t("process.title2")}</span>
            </h2>
          </motion.div>
          <div className="mt-16 space-y-0">
            {steps.map((step, i) => (
              <div key={step.num} onClick={() => setActive(i)}
                className={`grid grid-cols-[60px_1fr] gap-6 py-8 border-t border-border cursor-pointer relative transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-40"}`}>
                <div className={`absolute left-0 top-0 w-[2px] bg-mgaccent transition-all duration-500 ${active === i ? "h-full" : "h-0"}`} />
                <span className="font-mono text-[0.7rem] text-mgaccent tracking-[0.15em] pt-1">{step.num}</span>
                <div>
                  <h4 className="font-head font-bold text-[1.1rem] uppercase tracking-[0.08em] text-foreground mb-1.5">{step.title}</h4>
                  <p className="text-[0.83rem] text-mgsteel leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}
          className="lg:sticky lg:top-[120px] h-[400px] lg:h-[560px] bg-mgbg3 border border-border flex items-center justify-center overflow-hidden relative">
          <div className="relative w-full h-full flex items-center justify-center">
            {[340, 240, 140].map((size, i) => (
              <div key={size} className="absolute rounded-full"
                style={{ width: size, height: size, border: `1px solid rgba(52,73,100,${0.15 + i * 0.1})`, animation: `ringPulse 4s ease-in-out infinite ${i * 0.8}s` }} />
            ))}
            <div className="w-[70px] h-[70px] bg-mgaccent" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", animation: "rotateSlow 8s linear infinite" }} />
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-[0.65rem] text-mgmuted tracking-[0.15em]">MGR — PROCESS FLOW v2.4</div>
        </motion.div>
      </div>
    </section>
  );
};
