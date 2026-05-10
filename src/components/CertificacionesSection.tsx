import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ShieldCheck, Trophy, Star, Award, Download } from "lucide-react";
import { SMOOTH_EASE } from "@/lib/animations";
import { SectionLabel } from "@/components/SectionLabel";

const certificates = [
  { nameKey: "certs.iso9001", descKey: "certs.iso9001Desc", pdf: "/docs/certificado-9001-2027.pdf" },
  { nameKey: "certs.iatf16949", descKey: "certs.iatf16949Desc", pdf: "/docs/certificado-16949-2027.pdf" },
  { nameKey: "certs.iso14001", descKey: "certs.iso14001Desc", pdf: "/docs/certificado-14000.pdf" },
  { nameKey: "certs.iso45001", descKey: "certs.iso45001Desc", pdf: "/docs/certificado-45001-2008.pdf" },
];

const awards = [
  {
    icon: Trophy,
    titleKey: "certs.award1Title",
    descKey: "certs.award1Desc",
  },
  {
    icon: Star,
    titleKey: "certs.award2Title",
    descKey: "certs.award2Desc",
  },
  {
    icon: Award,
    titleKey: "certs.award3Title",
    descKey: "certs.award3Desc",
  },
];

export const CertificacionesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="calidad" className="bg-background py-[140px] px-6 lg:px-[60px]">
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: SMOOTH_EASE }}
        className="max-w-3xl mb-16"
      >
        <SectionLabel number="08">{t("certs.label") !== "certs.label" ? t("certs.label") : "Certificaciones"}</SectionLabel>
        <h2 className="font-head font-black text-foreground uppercase leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
          {t("certs.title")}
        </h2>
        <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
          {t("certs.intro")}
        </p>
      </motion.div>

      {/* Certificates Grid 2x2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.nameKey}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: SMOOTH_EASE }}
            className="bg-card border border-border p-6 flex flex-col gap-4 hover:border-mgaccent/50 hover:shadow-[0_0_20px_rgba(224,123,57,0.08)] transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 flex items-center justify-center bg-mgaccent/10 shrink-0">
                <ShieldCheck size={20} className="text-mgaccent" />
              </div>
              <div className="flex-1">
                <h3 className="font-head font-bold text-foreground text-lg tracking-wide uppercase">
                  {t(cert.nameKey)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{t(cert.descKey)}</p>
              </div>
            </div>
            <a
              href={cert.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-mgaccent text-sm font-semibold tracking-wide hover:underline mt-auto self-start"
            >
              <Download size={14} />
              {t("certs.download")}
            </a>
          </motion.div>
        ))}
      </div>

      {/* Política Integrada */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: SMOOTH_EASE }}
        className="bg-card border border-border p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-20"
      >
        <div>
          <h3 className="font-head font-bold text-foreground text-lg tracking-wide uppercase">
            {t("certs.politicaTitle")}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{t("certs.politicaDesc")}</p>
        </div>
        <a
          href="/docs/politica-integrada-2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-mgaccent text-sm font-semibold tracking-wide hover:underline shrink-0"
        >
          <Download size={14} />
          {t("certs.downloadShort")}
        </a>
      </motion.div>

      {/* Premios */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: SMOOTH_EASE }}
        className="mb-8"
      >
        <h3 className="font-head font-black text-foreground uppercase text-2xl tracking-wide mb-8">
          {t("certs.awardsTitle")}
        </h3>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {awards.map((award, i) => (
          <motion.div
            key={award.titleKey}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: SMOOTH_EASE }}
            className="bg-card border border-border p-6 hover:border-mgaccent/50 hover:shadow-[0_0_20px_rgba(224,123,57,0.08)] transition-all duration-300"
          >
            <award.icon size={28} className="text-mgaccent mb-4" />
            <h4 className="font-head font-bold text-foreground text-base tracking-wide uppercase mb-2">
              {t(award.titleKey)}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{t(award.descKey)}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
