import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { revealVariants } from "@/lib/animations";

const steps = [
  { num: "01", title: "Codiseño & Estudio", desc: "Estudio de factibilidad y codiseño de cada pieza junto al cliente. Desarrollo del utillaje propio para el proyecto." },
  { num: "02", title: "Preparación de Material", desc: "Selección y trefilado del alambrón de acero según las especificaciones técnicas de la pieza a producir." },
  { num: "03", title: "Estampación en Frío", desc: "Conformado progresivo en prensas de alta tonelada. Especialistas en piezas especiales, grandes y esbeltas." },
  { num: "04", title: "Mecanizado & Roscado", desc: "Mecanización de piezas propias y roscado con licencia Mathread. Operaciones auxiliares integradas en nuestras instalaciones." },
  { num: "05", title: "Tratamientos & Acabados", desc: "Gestión de los tratamientos térmicos y superficiales necesarios para entregar una pieza totalmente terminada." },
  { num: "06", title: "Control de Calidad", desc: "Inspección 100% dimensional, laboratorio interno, trazabilidad completa y los más exigentes controles bajo certificación IATF 16949." },
];

export const ProcessSection = () => {
  const [active, setActive] = useState(0);

  const nextStep = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextStep, 2800);
    return () => clearInterval(interval);
  }, [nextStep]);

  return (
    <section className="bg-mgbg2 border-t border-b border-[rgba(255,255,255,0.07)] px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-[100px] items-start">
        <div className="lg:sticky lg:top-[120px]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}>
            <div className="section-label">Cómo trabajamos</div>
            <h2 className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
              Proceso<br /><span className="text-outline">Productivo</span>
            </h2>
          </motion.div>
          <div className="mt-16 space-y-0">
            {steps.map((step, i) => (
              <div key={step.num} onClick={() => setActive(i)}
                className={`grid grid-cols-[60px_1fr] gap-6 py-8 border-t border-[rgba(255,255,255,0.07)] cursor-pointer relative transition-opacity duration-500 ${active === i ? "opacity-100" : "opacity-40"}`}>
                <div className={`absolute left-0 top-0 w-[2px] bg-mgaccent transition-all duration-500 ${active === i ? "h-full" : "h-0"}`} />
                <span className="font-mono text-[0.7rem] text-mgaccent tracking-[0.15em] pt-1">{step.num}</span>
                <div>
                  <h4 className="font-head font-bold text-[1.1rem] uppercase tracking-[0.08em] text-foreground mb-1.5">{step.title}</h4>
                  <p className="text-[0.83rem] text-mgsteel leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}
          className="lg:sticky lg:top-[120px] h-[400px] lg:h-[560px] bg-mgbg3 border border-[rgba(255,255,255,0.07)] flex items-center justify-center overflow-hidden relative">
          <div className="relative w-full h-full flex items-center justify-center">
            {[340, 240, 140].map((size, i) => (
              <div key={size} className="absolute rounded-full"
                style={{ width: size, height: size, border: `1px solid rgba(232,98,10,${0.15 + i * 0.1})`, animation: `ringPulse 4s ease-in-out infinite ${i * 0.8}s` }} />
            ))}
            <div className="w-[70px] h-[70px] bg-mgaccent" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)", animation: "rotateSlow 8s linear infinite" }} />
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-[0.65rem] text-mgmuted tracking-[0.15em]">MGR — PROCESS FLOW v2.4</div>
        </motion.div>
      </div>
    </section>
  );
};
