import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FileText, Download, ArrowRight, ShieldCheck } from "lucide-react";
import { SMOOTH_EASE } from "@/lib/animations";
import { SectionLabel } from "@/components/SectionLabel";

export const DescargasSection = () => {
  const { t } = useTranslation();

  const docs = [
    {
      icon: FileText,
      badge: "PDF Â· CatÃ¡logo tÃ©cnico",
      nameKey: "downloads.catalogo",
      descKey: "downloads.catalogoDesc",
      pdf: "/docs/catalogo-metagra.pdf",
      ariaLabel: "Descargar catÃ¡logo tÃ©cnico de Metagra en PDF",
    },
    {
      icon: ShieldCheck,
      badge: "PDF Â· Pack de certificados",
      nameKey: "downloads.certsPack",
      descKey: "downloads.certsPackDesc",
      pdf: "/docs/certificados-metagra.pdf",
      ariaLabel: "Descargar pack completo de certificados ISO de Metagra en PDF",
    },
  ];

  return (
    <section
      id="descargas"
      aria-label="SecciÃ³n de descargas"
      className="bg-background py-[140px] px-6 lg:px-[60px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: SMOOTH_EASE }}
        className="max-w-3xl mb-14"
      >
        <SectionLabel>{t("downloads.title")}</SectionLabel>
        <h2
          className="font-head font-black text-foreground uppercase leading-[0.9] tracking-tight"
          style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
        >
          {t("downloads.title")}
        </h2>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          {t("downloads.subtitle")}
        </p>
      </motion.div>

      {/* 2 columnas: catÃ¡logo + certificados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2px] bg-border/40">
        {docs.map((doc, i) => {
          const Icon = doc.icon;
          return (
            <motion.a
              key={doc.nameKey}
              href={doc.pdf}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={doc.ariaLabel}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: SMOOTH_EASE }}
              className="group flex flex-col bg-card p-10 lg:p-12 relative overflow-hidden hover:bg-mgsurface transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mgaccent"
            >
              {/* LÃ­nea de acento izquierda en hover */}
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-mgaccent transition-all duration-500 group-hover:h-full" aria-hidden="true" />

              {/* Icono */}
              <Icon
                className="w-12 h-12 text-mgaccent mb-7 group-hover:scale-110 transition-transform duration-500"
                strokeWidth={1.25}
                aria-hidden="true"
              />

              {/* Badge */}
              <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-3">
                {doc.badge}
              </div>

              {/* TÃ­tulo */}
              <h3
                className="font-head font-bold text-foreground tracking-[0.04em] uppercase mb-4 leading-tight"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}
              >
                {t(doc.nameKey)}
              </h3>

              {/* DescripciÃ³n */}
              <p className="text-[0.95rem] text-mgsteel leading-relaxed font-light mb-10 flex-1">
                {t(doc.descKey)}
              </p>

              {/* CTA */}
              <div
                className="inline-flex items-center gap-2 text-mgaccent font-head font-bold text-[0.8rem] tracking-[0.18em] uppercase group-hover:gap-3 transition-all"
                aria-hidden="true"
              >
                <Download size={14} strokeWidth={2} />
                <span>{t("downloads.downloadBtn")}</span>
                <ArrowRight size={14} strokeWidth={2} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
};