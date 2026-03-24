import { motion } from "framer-motion";
import { SMOOTH_EASE } from "@/lib/animations";

const certs = ["IATF 16949", "ISO 9001", "ISO 14001", "Mathread"];

export const QualitySection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: SMOOTH_EASE }}
      className="bg-mgaccent px-6 lg:px-[60px] py-20 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden z-[2]"
    >
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 font-head font-black text-[rgba(255,255,255,0.06)] leading-none tracking-tighter pointer-events-none" style={{ fontSize: "14rem" }}>
        CALIDAD
      </div>
      <div className="relative z-[1]">
        <h2 className="font-head font-black text-foreground uppercase leading-[1.05]" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
          Calidad como<br />Garantía Total
        </h2>
        <p className="mt-4 text-base text-[rgba(255,255,255,0.75)] max-w-[520px] leading-relaxed">
          Nuestro sistema de gestión de calidad asegura la factibilidad del proceso desde el diseño hasta la entrega. Los más exigentes controles de calidad están implícitos en nuestra filosofía de trabajo. Reconocidos como <strong className="text-foreground">mejor proveedor mundial de PSA</strong>, <strong className="text-foreground">preferred supplier de Bosch</strong> y ganadores del <strong className="text-foreground">premio a la calidad de Renault</strong>.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 relative z-[1]">
        {certs.map((cert) => (
          <div key={cert} className="bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.25)] px-5 py-3.5 font-head font-bold text-[0.85rem] tracking-[0.12em] uppercase text-foreground hover:bg-[rgba(255,255,255,0.25)] transition-colors cursor-default">
            {cert}
          </div>
        ))}
      </div>
    </motion.section>
  );
};
