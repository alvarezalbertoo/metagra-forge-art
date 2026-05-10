import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { revealVariants } from "@/lib/animations";
import { Hexagon, Diamond, CircleDot, Wrench, FlaskConical, Layers } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";

const icons = [Hexagon, Diamond, CircleDot, Wrench, FlaskConical, Layers];

export const TechSection = () => {
  const { t } = useTranslation();

  const techs = [
    { num: "01", icon: icons[0], title: t("tech.t1Title"), desc: t("tech.t1Desc"), featured: true },
    { num: "02", icon: icons[1], title: t("tech.t2Title"), desc: t("tech.t2Desc") },
    { num: "03", icon: icons[2], title: t("tech.t3Title"), desc: t("tech.t3Desc") },
    { num: "04", icon: icons[3], title: t("tech.t4Title"), desc: t("tech.t4Desc") },
    { num: "05", icon: icons[4], title: t("tech.t5Title"), desc: t("tech.t5Desc") },
    { num: "06", icon: icons[5], title: t("tech.t6Title"), desc: t("tech.t6Desc") },
  ];

  return (
    <section id="materiales" className="bg-mgbg px-6 lg:px-[60px] py-[140px] relative z-[2]">
      <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[72px] gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants}>
        <div>
          <SectionLabel number="03">{t("tech.label")}</SectionLabel>
          <h2 className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
            {t("tech.title1")}<br /><span className="text-outline">{t("tech.title2")}</span>
          </h2>
        </div>
        <Link to="/contacto" className="font-head font-semibold text-[0.85rem] tracking-[0.2em] uppercase px-9 py-4 border border-border text-mgsteel hover:border-foreground hover:text-foreground transition-all">
          {t("tech.cta")}
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {techs.map((tech, i) => (
          <motion.div key={tech.num} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants}
            className={`p-10 lg:p-12 relative overflow-hidden border border-border cursor-pointer transition-all duration-500 group ${tech.featured ? "bg-mgaccent hover:bg-mgaccent2" : "bg-mgbg3 hover:bg-mgsurface"}`}>
            {!tech.featured && <div className="absolute inset-0 bg-gradient-to-br from-mgaccent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
            <span className={`font-mono text-[0.68rem] tracking-[0.2em] block mb-8 ${tech.featured ? "text-white/80" : "text-mgaccent"}`}>{tech.num}</span>
            <div className={`w-14 h-14 border flex items-center justify-center mb-7 transition-all duration-300 ${tech.featured ? "border-white/30 group-hover:bg-white/15" : "border-border group-hover:border-mgaccent group-hover:bg-mgaccent/10"}`}>
              <tech.icon className={`w-6 h-6 ${tech.featured ? "text-white" : "text-mgaccent"}`} strokeWidth={1.5} />
            </div>
            <h3 className={`font-head font-extrabold text-[1.7rem] uppercase tracking-[0.04em] leading-tight mb-4 whitespace-pre-line ${tech.featured ? "text-white" : "text-foreground"}`}>{tech.title}</h3>
            <p className={`text-[0.88rem] leading-relaxed font-light ${tech.featured ? "text-white/90" : "text-mgsteel"}`}>{tech.desc}</p>
            <Link to="/contacto" className={`mt-8 inline-flex items-center gap-2.5 font-head font-bold text-[0.78rem] tracking-[0.18em] uppercase transition-all group-hover:gap-4 ${tech.featured ? "text-white" : "text-mgaccent"}`}>
              {t("tech.more")} <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
