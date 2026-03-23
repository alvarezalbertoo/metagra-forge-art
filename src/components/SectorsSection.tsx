import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const sectors = [
  {
    tag: "Principal",
    title: "Automoción",
    pattern: "repeating-linear-gradient(45deg, #e8620a 0, #e8620a 1px, transparent 0, transparent 50%)",
    patternSize: "20px 20px",
  },
  {
    tag: "Transporte",
    title: "Ferroviario",
    pattern: "radial-gradient(circle at 50% 50%, rgba(232,98,10,0.3) 0%, transparent 60%)",
  },
  {
    tag: "Alta Exigencia",
    title: "Aeronáutico",
    pattern: "repeating-conic-gradient(rgba(232,98,10,0.08) 0deg, transparent 10deg, transparent 30deg)",
  },
];

export const SectorsSection = () => {
  return (
    <section className="bg-mgbg2 px-6 lg:px-[60px] py-[120px] relative z-[2]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-[72px]">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants}>
          <div className="section-label">Mercados</div>
          <h2
            className="font-head font-extrabold uppercase leading-none tracking-tight text-foreground"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}
          >
            Sectores<br /><span className="text-outline">Clave</span>
          </h2>
        </motion.div>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
          variants={revealVariants}
          className="text-mgsteel text-[0.95rem] leading-relaxed font-light"
        >
          Nuestras piezas se integran en los sistemas más críticos de los principales
          fabricantes de automóviles y vehículos de transporte de Europa y América.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        {sectors.map((sector, i) => (
          <motion.div
            key={sector.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="relative h-[320px] overflow-hidden bg-mgbg3 cursor-pointer group"
          >
            {/* Background with pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-mgsurface to-[#0d1018] transition-transform duration-500 group-hover:scale-105">
              <div
                className="absolute inset-0 opacity-[0.18] transition-opacity duration-400 group-hover:opacity-[0.35]"
                style={{
                  background: sector.pattern,
                  ...(sector.patternSize ? { backgroundSize: sector.patternSize } : {}),
                }}
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-9 flex flex-col justify-end bg-gradient-to-t from-[rgba(10,11,13,0.9)] to-transparent">
              <div className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-mgaccent mb-2.5">
                {sector.tag}
              </div>
              <h3 className="font-head font-extrabold text-[1.6rem] uppercase tracking-[0.05em] text-foreground">
                {sector.title}
              </h3>
            </div>

            {/* Arrow */}
            <div className="absolute top-8 right-8 w-9 h-9 border border-[rgba(255,255,255,0.07)] flex items-center justify-center text-mgmuted text-sm transition-all duration-300 group-hover:bg-mgaccent group-hover:border-mgaccent group-hover:text-foreground group-hover:rotate-45">
              →
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
