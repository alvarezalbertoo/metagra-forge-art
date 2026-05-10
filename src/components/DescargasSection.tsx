import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileText, Download } from "lucide-react";
import { SMOOTH_EASE } from "@/lib/animations";
import { SectionLabel } from "@/components/SectionLabel";

const certDownloads = [
  { nameKey: "downloads.iso9001", descKey: "downloads.iso9001Desc", pdf: "/docs/certificado-9001-2027.pdf" },
  { nameKey: "downloads.iatf16949", descKey: "downloads.iatf16949Desc", pdf: "/docs/certificado-16949-2027.pdf" },
  { nameKey: "downloads.iso14001", descKey: "downloads.iso14001Desc", pdf: "/docs/certificado-14000.pdf" },
  { nameKey: "downloads.iso45001", descKey: "downloads.iso45001Desc", pdf: "/docs/certificado-45001-2008.pdf" },
  { nameKey: "downloads.politica", descKey: "", pdf: "/docs/politica-integrada-2025.pdf" },
];

const catalogDownloads = [
  { nameKey: "downloads.catalogo", descKey: "downloads.catalogoDesc", pdf: "/docs/catalogo-metagra.pdf" },
  { nameKey: "downloads.corporativa", descKey: "downloads.corporativaDesc", pdf: "/docs/metagra-group.pdf" },
];

interface DownloadRowProps {
  nameKey: string;
  descKey: string;
  pdf: string;
  t: (key: string) => string;
}

const DownloadRow = ({ nameKey, descKey, pdf, t }: DownloadRowProps) => (
  <a
    href={pdf}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 px-4 py-3.5 border-b border-border last:border-b-0 hover:bg-card transition-colors group"
  >
    <FileText size={18} className="text-muted-foreground shrink-0" />
    <div className="flex-1 min-w-0">
      <span className="text-sm font-semibold text-foreground">{t(nameKey)}</span>
      {descKey && (
        <span className="text-sm text-muted-foreground ml-1.5">· {t(descKey)}</span>
      )}
    </div>
    <span className="flex items-center gap-1.5 text-mgaccent text-sm font-semibold shrink-0 group-hover:underline">
      <Download size={14} />
      {t("downloads.downloadBtn")}
    </span>
  </a>
);

export const DescargasSection = () => {
  const { t } = useTranslation();

  return (
    <section id="descargas" className="bg-background py-[140px] px-6 lg:px-[60px]">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: SMOOTH_EASE }}
        className="max-w-3xl mb-14"
      >
        <SectionLabel number="09">{t("downloads.title")}</SectionLabel>
        <h2 className="font-head font-black text-foreground uppercase leading-[0.9] tracking-tight" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}>
          {t("downloads.title")}
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {t("downloads.subtitle")}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Column A: Certificados */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: SMOOTH_EASE }}
        >
          <h3 className="font-head font-bold text-foreground text-sm tracking-[0.15em] uppercase mb-4 text-muted-foreground">
            {t("downloads.certsColumn")}
          </h3>
          <div className="border border-border bg-card/50">
            {certDownloads.map((d) => (
              <DownloadRow key={d.nameKey} {...d} t={t} />
            ))}
          </div>
        </motion.div>

        {/* Column B: Catálogos */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: SMOOTH_EASE }}
        >
          <h3 className="font-head font-bold text-foreground text-sm tracking-[0.15em] uppercase mb-4 text-muted-foreground">
            {t("downloads.catalogsColumn")}
          </h3>
          <div className="border border-border bg-card/50">
            {catalogDownloads.map((d) => (
              <DownloadRow key={d.nameKey} {...d} t={t} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
