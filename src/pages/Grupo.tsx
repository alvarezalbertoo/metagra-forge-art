import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AboutSection } from "@/components/AboutSection";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SMOOTH_EASE } from "@/lib/animations";

const Grupo = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <div className="pt-[72px]">
        <section className="bg-mgbg px-6 lg:px-[60px] py-[120px] relative z-[2]">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: SMOOTH_EASE }}>
            <div className="section-label">{t("grupo.label")}</div>
            <h1 className="font-head font-black text-foreground uppercase leading-none tracking-tight" style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)" }}>
              {t("grupo.title1")}<br /><span className="text-outline">{t("grupo.title2")}</span>
            </h1>
            <p className="mt-8 text-lg text-mgsteel font-light max-w-2xl leading-relaxed">
              {t("grupo.desc1")}
            </p>
            <p className="mt-6 text-lg text-mgsteel font-light max-w-2xl leading-relaxed" dangerouslySetInnerHTML={{ __html: t("grupo.desc2") }} />
          </motion.div>
        </section>
        <AboutSection />
      </div>
      <Footer />
    </>
  );
};

export default Grupo;
