import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { revealVariants } from "@/lib/animations";
import { Hexagon, Diamond, CircleDot, Wrench, FlaskConical, Layers } from "lucide-react";

const techs = [
  { num: "01", icon: Hexagon, title: "Estampación\nen Frío", desc: "Soluciones de estampación en frío de piezas metálicas para automoción. Especialistas en piezas especiales, grandes y esbeltas, con codiseño y estudio de factibilidad de cada pieza.", featured: true },
  { num: "02", icon: Diamond, title: "Mecanizado\nCNC", desc: "Mecanización de piezas propias de acero estampado como operación auxiliar clave. Solución integral de estampación y mecanizado en nuestras instalaciones." },
  { num: "03", icon: CircleDot, title: "Roscado\nEspecial", desc: "Roscado de piezas estampadas en frío y producción de tornillos especiales para automoción. Disponemos de licencia Mathread. Solo roscado de piezas de producción propia." },
  { num: "04", icon: Wrench, title: "Utillaje\nPropio", desc: "Desarrollo y fabricación de utillaje propio para nuestros proyectos. Autonomía total en herramientas y matrices que nos convierte en referente del sector." },
  { num: "05", icon: FlaskConical, title: "Tratamientos\ny Acabados", desc: "Gestionamos los tratamientos necesarios para ofrecerte una pieza totalmente terminada. Control integral del proceso desde el alambrón hasta el producto final." },
  { num: "06", icon: Layers, title: "Servicio\nIntegral", desc: "Desde el alambrón hasta la pieza acabada: estampación, mecanizado, roscado, tratamientos, control de calidad y logística en una sola empresa." },
];

export const TechSection = () => {
  return (
    <section className="bg-mgbg px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <motion.div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-[72px] gap-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants}>
        <div>
          <div className="section-label">Capacidades</div>
          <h2 className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
            Nuestras<br /><span className="text-outline">Tecnologías</span>
          </h2>
        </div>
        <Link to="/contacto" className="font-head font-semibold text-[0.85rem] tracking-[0.2em] uppercase px-9 py-4 border border-[rgba(255,255,255,0.07)] text-mgsteel hover:border-foreground hover:text-foreground transition-all">
          Solicitar información →
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
        {techs.map((tech, i) => (
          <motion.div key={tech.num} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants}
            className={`p-10 lg:p-12 relative overflow-hidden border border-[rgba(255,255,255,0.07)] cursor-pointer transition-all duration-500 group ${tech.featured ? "bg-mgaccent hover:bg-mgaccent2" : "bg-mgbg3 hover:bg-mgsurface"}`}>
            {!tech.featured && <div className="absolute inset-0 bg-gradient-to-br from-[rgba(232,98,10,0.08)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
            <span className={`font-mono text-[0.68rem] tracking-[0.2em] block mb-8 ${tech.featured ? "text-[rgba(255,255,255,0.8)]" : "text-mgaccent"}`}>{tech.num}</span>
            <div className={`w-14 h-14 border flex items-center justify-center mb-7 transition-all duration-300 ${tech.featured ? "border-[rgba(255,255,255,0.3)] group-hover:bg-[rgba(255,255,255,0.15)]" : "border-[rgba(255,255,255,0.07)] group-hover:border-mgaccent group-hover:bg-[rgba(232,98,10,0.1)]"}`}>
              <tech.icon className={`w-6 h-6 ${tech.featured ? "text-foreground" : "text-mgaccent"}`} strokeWidth={1.5} />
            </div>
            <h3 className="font-head font-extrabold text-[1.7rem] uppercase tracking-[0.04em] leading-tight mb-4 whitespace-pre-line text-foreground">{tech.title}</h3>
            <p className={`text-[0.88rem] leading-relaxed font-light ${tech.featured ? "text-foreground" : "text-mgsteel"}`}>{tech.desc}</p>
            <Link to="/contacto" className={`mt-8 inline-flex items-center gap-2.5 font-head font-bold text-[0.78rem] tracking-[0.18em] uppercase transition-all group-hover:gap-4 ${tech.featured ? "text-foreground" : "text-mgaccent"}`}>
              Más información <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
