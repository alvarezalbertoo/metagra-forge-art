import { motion } from "framer-motion";
import { SMOOTH_EASE } from "@/lib/animations";

export const CinematicBleed = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: SMOOTH_EASE }}
      className="relative w-full h-[60vh] min-h-[420px] overflow-hidden z-[2]"
    >
      {/* TODO: imagen industrial real Metagra */}
      <img
        src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2000&q=85"
        alt="Detalle industrial Metagra"
        className="w-full h-full object-cover grayscale contrast-125 brightness-75"
        loading="lazy"
      />
      {/* Capa 1: tinte navy fuerte (duotono) */}
      <div className="absolute inset-0 bg-mgaccent/40 mix-blend-multiply" />
      {/* Capa 2: degradado izquierda → derecha para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-r from-mgbg via-mgbg/60 to-mgbg/20" />
      {/* Capa 3: overlay oscuro sutil para mejor contraste global */}
      <div className="absolute inset-0 bg-foreground/20" />

      <div className="absolute inset-0 flex items-center px-6 lg:px-[60px]">
        <div className="max-w-[640px] relative z-[2]">
          <div className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-mgaccent mb-4">
            ★ Cold Forging · Bergara ⇄ Guanajuato
          </div>
          <h3
            className="font-head font-black uppercase text-foreground leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
          >
            Acero forjado<br />
            <span className="text-mgaccent">a contrarreloj</span>
          </h3>
        </div>
      </div>
    </motion.section>
  );
};
