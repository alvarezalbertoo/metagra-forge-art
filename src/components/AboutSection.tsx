import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { revealVariants } from "@/lib/animations";
import { Cog, Leaf, Globe, Users, ShieldCheck, Lightbulb } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";

export const AboutSection = () => {
  const { t } = useTranslation();

  const cards = [
    { icon: Cog, title: t("about.card1Title"), desc: t("about.card1Desc") },
    { icon: Leaf, title: t("about.card2Title"), desc: t("about.card2Desc") },
    { icon: Globe, title: t("about.card3Title"), desc: t("about.card3Desc") },
    { icon: Users, title: t("about.card4Title"), desc: t("about.card4Desc") },
    { icon: ShieldCheck, title: t("about.card5Title"), desc: t("about.card5Desc") },
    { icon: Lightbulb, title: t("about.card6Title"), desc: t("about.card6Desc") },
  ];

  return (
    <section id="servicios" className="bg-mgbg2 px-6 lg:px-[60px] py-[140px] relative z-[2]">
      {/* Cabecera */}
      <motion.div
        className="max-w-[760px] mb-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={revealVariants}
      >
        <SectionLabel>{t("about.label")}</SectionLabel>
        <h2
          className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          {t("about.title1")} {t("about.title2")} {t("about.title3")}
        </h2>
        <p
          className="mt-8 text-[1.05rem] leading-[1.85] text-mgsteel font-light max-w-[640px]"
          dangerouslySetInnerHTML={{ __html: t("about.desc") }}
        />
      </motion.div>

      {/* Grid 3 columnas × 2 filas - SIN bordes, espaciado generoso */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16"
      >
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              custom={i + 1}
              variants={revealVariants}
              className="group"
            >
              {/* Icono grande, suelto, sin contenedor */}
              <Icon
                className="w-12 h-12 text-mgaccent mb-7 group-hover:scale-110 transition-transform duration-500"
                strokeWidth={1.25}
              />

              {/* Título */}
              <h4 className="font-head font-bold text-[1.2rem] tracking-[0.04em] uppercase text-foreground mb-4 leading-tight">
                {card.title}
              </h4>

              {/* Descripción */}
              <p className="text-[0.95rem] text-mgsteel leading-[1.75] font-light max-w-[340px]">
                {card.desc}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
