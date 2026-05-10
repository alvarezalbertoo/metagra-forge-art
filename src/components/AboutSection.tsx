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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <motion.div className="lg:col-span-5 lg:sticky lg:top-28" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants}>
          <SectionLabel number="01">{t("about.label")}</SectionLabel>
          <h2 className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
            {t("about.title1")} <br /><span className="text-outline">{t("about.title2")}</span><br />{t("about.title3")}
          </h2>
          <div className="w-10 h-[3px] bg-mgaccent my-7" />
          <p className="text-[1.05rem] leading-[1.85] text-mgsteel font-light" dangerouslySetInnerHTML={{ __html: t("about.desc") }} />
        </motion.div>

        {/* Bento asimétrico */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="lg:col-span-7 grid grid-cols-12 auto-rows-[minmax(180px,auto)] gap-[2px] bg-border/60">
          {/* Card 01 — grande */}
          <motion.div custom={1} variants={revealVariants} className="col-span-12 lg:col-span-7 lg:row-span-2 bg-mgsurface p-8 lg:p-12 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[3px] h-0 bg-mgaccent transition-all duration-500 group-hover:h-full" />
            <div>
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-4">01 · {cards[0].title}</div>
              <h3 className="font-head font-extrabold uppercase leading-[0.9] tracking-tight text-foreground" style={{ fontSize: "clamp(2rem, 3.6vw, 3.4rem)" }}>
                {cards[0].title}
              </h3>
            </div>
            <p className="text-[0.95rem] text-mgsteel leading-relaxed mt-8 max-w-[380px]">{cards[0].desc}</p>
            <div className="mt-8 w-12 h-12 border border-border flex items-center justify-center group-hover:border-mgaccent group-hover:bg-mgaccent/10 transition-all">
              {(() => { const I = cards[0].icon; return <I className="w-6 h-6 text-mgaccent" strokeWidth={1.5} />; })()}
            </div>
          </motion.div>

          {/* Card 02 — invertida */}
          <motion.div custom={2} variants={revealVariants} className="col-span-12 lg:col-span-5 bg-foreground text-background p-7 group relative overflow-hidden">
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 border border-background/30 flex items-center justify-center">
                {(() => { const I = cards[1].icon; return <I className="w-5 h-5 text-mgaccent" strokeWidth={1.5} />; })()}
              </div>
              <span className="font-mono text-[0.62rem] tracking-[0.2em] text-background/50">02</span>
            </div>
            <h4 className="font-head font-bold text-[1.05rem] tracking-[0.05em] uppercase mb-2">{cards[1].title}</h4>
            <p className="text-[0.82rem] text-background/70 leading-relaxed">{cards[1].desc}</p>
          </motion.div>

          {/* Card 03 */}
          <motion.div custom={3} variants={revealVariants} className="col-span-6 lg:col-span-3 bg-mgbg2 p-6 group relative overflow-hidden hover:bg-mgsurface transition-colors">
            <div className="w-9 h-9 border border-border flex items-center justify-center mb-4 group-hover:border-mgaccent">
              {(() => { const I = cards[2].icon; return <I className="w-4 h-4 text-mgaccent" strokeWidth={1.5} />; })()}
            </div>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mgmuted block mb-2">03</span>
            <h4 className="font-head font-bold text-[0.95rem] tracking-[0.04em] uppercase text-foreground mb-1.5">{cards[2].title}</h4>
            <p className="text-[0.78rem] text-mgmuted leading-relaxed">{cards[2].desc}</p>
          </motion.div>

          {/* Card 04 */}
          <motion.div custom={4} variants={revealVariants} className="col-span-6 lg:col-span-2 bg-mgbg3 p-6 group relative overflow-hidden hover:bg-mgsurface transition-colors">
            <div className="w-9 h-9 border border-border flex items-center justify-center mb-4 group-hover:border-mgaccent">
              {(() => { const I = cards[3].icon; return <I className="w-4 h-4 text-mgaccent" strokeWidth={1.5} />; })()}
            </div>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mgmuted block mb-2">04</span>
            <h4 className="font-head font-bold text-[0.9rem] tracking-[0.04em] uppercase text-foreground">{cards[3].title}</h4>
          </motion.div>

          {/* Card 05 */}
          <motion.div custom={5} variants={revealVariants} className="col-span-6 lg:col-span-3 bg-mgsurface p-6 border-t border-border group relative overflow-hidden">
            <div className="w-9 h-9 border border-border flex items-center justify-center mb-4 group-hover:border-mgaccent">
              {(() => { const I = cards[4].icon; return <I className="w-4 h-4 text-mgaccent" strokeWidth={1.5} />; })()}
            </div>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mgmuted block mb-2">05</span>
            <h4 className="font-head font-bold text-[0.95rem] tracking-[0.04em] uppercase text-foreground mb-1.5">{cards[4].title}</h4>
            <p className="text-[0.78rem] text-mgmuted leading-relaxed">{cards[4].desc}</p>
          </motion.div>

          {/* Card 06 */}
          <motion.div custom={6} variants={revealVariants} className="col-span-6 lg:col-span-2 bg-mgaccent text-white p-6 group relative overflow-hidden">
            <div className="w-9 h-9 border border-white/30 flex items-center justify-center mb-4">
              {(() => { const I = cards[5].icon; return <I className="w-4 h-4 text-white" strokeWidth={1.5} />; })()}
            </div>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/60 block mb-2">06</span>
            <h4 className="font-head font-bold text-[0.9rem] tracking-[0.04em] uppercase">{cards[5].title}</h4>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
