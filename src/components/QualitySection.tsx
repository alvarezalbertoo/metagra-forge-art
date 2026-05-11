import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SMOOTH_EASE } from "@/lib/animations";
import { SectionLabel } from "@/components/SectionLabel";

const certs = ["IATF 16949", "ISO 9001", "ISO 14001", "Mathread"];

export const QualitySection = () => {
  const { t } = useTranslation();

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: SMOOTH_EASE }}
      className="bg-mgaccent px-6 lg:px-[60px] py-20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden z-[2]"
    >
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-head font-black text-white/[0.06] leading-none tracking-tighter pointer-events-none" style={{ fontSize: "14rem" }}>
        CALIDAD
      </div>
      <div className="relative z-[1]">
        <SectionLabel number="07" variant="light">{t("quality.title1")}</SectionLabel>
        <h2 className="font-head font-black text-white uppercase leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)" }}>
          {t("quality.title1")}<br />{t("quality.title2")}
        </h2>
        <p className="mt-4 text-base text-white/75 max-w-[520px] leading-relaxed" dangerouslySetInnerHTML={{ __html: t("quality.desc") }} />
      </div>
      <div className="flex flex-wrap gap-4 relative z-[1]">
        {certs.map((cert) => (
          <div key={cert} className="bg-white/15 border border-white/25 px-5 py-3.5 font-head font-bold text-[0.85rem] tracking-[0.12em] uppercase text-white hover:bg-white/25 transition-colors cursor-default">
            {cert}
          </div>
        ))}
      </div>
    </motion.section>
  );
};