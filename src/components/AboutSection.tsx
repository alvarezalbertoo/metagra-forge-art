import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { revealVariants } from "@/lib/animations";
import { Cog, Leaf, Globe, Users } from "lucide-react";

export const AboutSection = () => {
  const { t } = useTranslation();

  const cards = [
    { icon: Cog, title: t("about.card1Title"), desc: t("about.card1Desc") },
    { icon: Leaf, title: t("about.card2Title"), desc: t("about.card2Desc") },
    { icon: Globe, title: t("about.card3Title"), desc: t("about.card3Desc") },
    { icon: Users, title: t("about.card4Title"), desc: t("about.card4Desc") },
  ];

  return (
    <section id="servicios" className="bg-mgbg2 px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants}>
          <div className="section-label">{t("about.label")}</div>
          <h2 className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
            {t("about.title1")} <br /><span className="text-outline">{t("about.title2")}</span><br />{t("about.title3")}
          </h2>
          <div className="w-10 h-[3px] bg-mgaccent my-7" />
          <p className="text-[1.05rem] leading-[1.85] text-mgsteel font-light" dangerouslySetInnerHTML={{ __html: t("about.desc") }} />
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="grid grid-cols-2 gap-[2px]">
          {cards.map((card, i) => (
            <motion.div key={card.title} custom={i + 1} variants={revealVariants} className="bg-mgsurface p-7 border border-border relative overflow-hidden transition-all duration-300 hover:border-mgaccent/20 hover:-translate-y-1 group">
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-mgaccent transition-all duration-500 group-hover:h-full" />
              <div className="w-10 h-10 border border-border flex items-center justify-center mb-3.5 group-hover:border-mgaccent group-hover:bg-mgaccent/10 transition-all duration-300">
                <card.icon className="w-5 h-5 text-mgaccent" strokeWidth={1.5} />
              </div>
              <h4 className="font-head font-bold text-[1.1rem] tracking-[0.05em] uppercase text-foreground mb-2">{card.title}</h4>
              <p className="text-[0.82rem] text-mgmuted leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
