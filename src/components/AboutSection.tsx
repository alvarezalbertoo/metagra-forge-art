import { motion } from "framer-motion";
import { revealVariants } from "@/lib/animations";
import { Cog, Leaf, Globe, Users } from "lucide-react";

const cards = [
  { icon: Cog, title: "Tecnología", desc: "Maquinaria de última generación y desarrollo de utillaje propio para estampación de piezas complejas y de gran tamaño." },
  { icon: Leaf, title: "Sostenibilidad", desc: "Comprometidos con la reducción de huella de carbono, certificación ISO 14001 y procesos de producción eficientes." },
  { icon: Globe, title: "Global", desc: "Presencia en España y México, con cadena de suministro integrada y servicio local para fabricantes europeos y globales." },
  { icon: Users, title: "Personas", desc: "Gran equipo de profesionales altamente cualificado, formado continuamente en nuevas tecnologías y con décadas de experiencia acumulada." },
];

export const AboutSection = () => {
  return (
    <section className="bg-mgbg2 px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={revealVariants}>
          <div className="section-label">Quiénes Somos</div>
          <h2 className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground" style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
            Tradición <br /><span className="text-outline">Industrial</span><br />Vasca
          </h2>
          <div className="w-10 h-[3px] bg-mgaccent my-7" />
          <p className="text-[1.05rem] leading-[1.85] text-mgsteel font-light">
            Metagra Group es un referente en la <strong className="text-foreground font-medium">estampación en frío de alambrón de acero</strong>, así como en labores de <strong className="text-foreground font-medium">roscados y mecanizados de piezas metálicas</strong> para el sector de la automoción.
            <br /><br />
            Desde nuestra planta en Bergara, Gipuzkoa, y con presencia en México, servimos a los principales fabricantes de automoción europeos y globales. Más de cinco décadas de trabajo, un gran equipo de profesionales y un exigente impulso en innovación nos permiten ofrecer medios a la <strong className="text-foreground font-medium">vanguardia tecnológica</strong>.
            <br /><br />
            Reconocidos como <strong className="text-foreground font-medium">mejor proveedor mundial de PSA</strong>, <strong className="text-foreground font-medium">preferred supplier de Bosch</strong> y ganadores del <strong className="text-foreground font-medium">premio a la calidad de Renault</strong>.
          </p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} className="grid grid-cols-2 gap-[2px]">
          {cards.map((card, i) => (
            <motion.div key={card.title} custom={i + 1} variants={revealVariants} className="bg-mgsurface p-7 border border-[rgba(255,255,255,0.07)] relative overflow-hidden transition-all duration-300 hover:border-[rgba(232,98,10,0.2)] hover:-translate-y-1 group">
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-mgaccent transition-all duration-500 group-hover:h-full" />
              <div className="w-10 h-10 border border-[rgba(255,255,255,0.1)] flex items-center justify-center mb-3.5 group-hover:border-mgaccent group-hover:bg-[rgba(232,98,10,0.08)] transition-all duration-300">
                <card.icon className="w-5 h-5 text-mgaccent" strokeWidth={1.5} />
              </div>
              <h4 className="font-head font-bold text-[1.1rem] tracking-[0.05em] uppercase text-foreground mb-2">{card.title}</h4>
              <p className="text-[0.82rem] text-mgmuted leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
