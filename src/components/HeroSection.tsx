import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { revealVariants, fadeUp, stagger, SMOOTH_EASE } from "@/lib/animations";

export const HeroSection = () => {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-mgbg via-[#12141a] to-[#0d1018]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(232,98,10,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,98,10,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 60% 50%, black 30%, transparent 80%)",
        }}
      />
      <div
        className="absolute right-[-80px] top-0 bottom-0 w-[55%] hidden lg:block"
        style={{
          background: "linear-gradient(160deg, rgba(20,22,28,0) 0%, rgba(25,28,36,1) 40%)",
          clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)",
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-[3px] h-[55%]"
        style={{ background: "linear-gradient(to top, #e8620a, transparent)" }}
      />

      <motion.div
        className="relative z-[2] px-6 lg:px-[60px] max-w-[760px]"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 font-mono text-[0.7rem] text-mgaccent tracking-[0.2em] uppercase mb-7">
          <span className="w-7 h-[1px] bg-mgaccent" />
          Bergara, Gipuzkoa — Desde 1970
        </motion.div>
        <motion.h1
          variants={fadeUp}
          className="font-head font-black text-foreground uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: "clamp(3.8rem, 7vw, 7rem)" }}
        >
          Acero<br />en <span className="text-outline-accent">Movimiento</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-7 text-base font-light leading-relaxed text-mgsteel max-w-[520px]">
          Estampación en frío de alambrón de acero, mecanizado y roscado de piezas metálicas para el sector de la automoción.
          Más de <strong className="text-foreground font-medium">cinco décadas</strong> a la vanguardia tecnológica en la producción de piezas para <strong className="text-foreground font-medium">dirección, frenos, transmisión y motor</strong>.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-11 flex flex-wrap gap-4 items-center">
          <Link to="/tecnologias" className="relative overflow-hidden font-head font-bold text-[0.85rem] tracking-[0.2em] uppercase px-9 py-4 bg-mgaccent text-foreground hover:-translate-y-0.5 transition-transform group">
            <span className="absolute inset-0 bg-mgaccent2 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <span className="relative z-[1]">Ver Tecnologías</span>
          </Link>
          <Link to="/contacto" className="font-head font-semibold text-[0.85rem] tracking-[0.2em] uppercase px-9 py-4 border border-[rgba(255,255,255,0.07)] text-mgsteel hover:border-foreground hover:text-foreground transition-all">
            Solicitar información
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-[60px] right-[60px] z-[2] hidden lg:flex gap-12"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: SMOOTH_EASE }}
      >
        {[
          { num: "+50", label: "Años de experiencia" },
          { num: "2", label: "Plantas (ES + MX)" },
          { num: "IATF", label: "16949 Certificación" },
        ].map((s) => (
          <div key={s.label} className="text-right">
            <div className="font-head text-[2.6rem] font-extrabold text-foreground leading-none">
              <span className="text-mgaccent">{s.num.includes("+") ? "+" : ""}</span>
              {s.num.replace("+", "")}
            </div>
            <div className="font-mono text-[0.65rem] tracking-[0.15em] uppercase text-mgmuted mt-1">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="absolute bottom-[30px] left-[60px] z-[2] hidden lg:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <div className="w-[1px] h-12" style={{ background: "linear-gradient(to bottom, #e8620a, transparent)", animation: "scrollPulse 1.8s ease-in-out infinite" }} />
        <span className="font-mono text-[0.6rem] tracking-[0.2em] text-mgmuted" style={{ writingMode: "vertical-lr" }}>Scroll</span>
      </motion.div>
    </section>
  );
};
