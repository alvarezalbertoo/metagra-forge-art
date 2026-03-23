import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cards = [
  { icon: "⚙️", title: "Tecnología", desc: "Maquinaria de última generación para estampación de piezas complejas y de gran tamaño." },
  { icon: "🌱", title: "Sostenibilidad", desc: "Comprometidos con la reducción de huella de carbono y procesos de producción eficientes." },
  { icon: "🌐", title: "Global", desc: "Presencia en Europa y México, con cadena de suministro integrada y servicio local." },
  { icon: "👥", title: "Personas", desc: "Equipo humano altamente cualificado, formado continuamente en nuevas tecnologías." },
];

export const AboutSection = () => {
  return (
    <section className="bg-mgbg2 px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={revealVariants}
        >
          <div className="section-label">Quiénes Somos</div>
          <h2
            className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
          >
            Tradición <br />
            <span className="text-outline">Industrial</span>
            <br />
            Vasca
          </h2>
          <div className="w-10 h-[3px] bg-mgaccent my-7" />
          <p className="text-[1.05rem] leading-[1.85] text-mgsteel font-light">
            Metagra Group es un referente en la{" "}
            <strong className="text-foreground font-medium">estampación en frío de alambrón de acero</strong>.
            Desde nuestra planta en Bergara, Gipuzkoa, producimos piezas especiales y de gran tamaño
            para los principales fabricantes de{" "}
            <strong className="text-foreground font-medium">automoción europeos y globales</strong>.
            <br /><br />
            Con más de cinco décadas de experiencia acumulada, combinamos el conocimiento
            del tejido industrial vasco con tecnología de vanguardia y un profundo compromiso
            con la calidad, el medioambiente y las personas.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid grid-cols-2 gap-[2px]"
        >
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i + 1}
              variants={revealVariants}
              className="bg-mgsurface p-7 border border-[rgba(255,255,255,0.07)] relative overflow-hidden transition-all duration-300 hover:border-[rgba(232,98,10,0.2)] hover:-translate-y-1 group"
            >
              <div className="absolute top-0 left-0 w-[3px] h-0 bg-mgaccent transition-all duration-400 group-hover:h-full" />
              <div className="text-[1.8rem] mb-3.5">{card.icon}</div>
              <h4 className="font-head font-bold text-[1.1rem] tracking-[0.05em] uppercase text-foreground mb-2">
                {card.title}
              </h4>
              <p className="text-[0.82rem] text-mgmuted leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
