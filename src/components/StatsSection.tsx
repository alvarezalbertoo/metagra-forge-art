import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SMOOTH_EASE } from "@/lib/animations";

function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(ease * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

export const StatsSection = () => {
  const { t } = useTranslation();

  const stats = [
    { prefix: "+", value: 50, suffix: "", label: t("stats.s1") },
    { prefix: "", value: 2, suffix: "", label: t("stats.s2") },
    { prefix: "", value: 300, suffix: "+", label: t("stats.s3") },
    { prefix: "", value: 100, suffix: "%", label: t("stats.s4") },
  ];

  return (
    <section className="bg-mgbg px-6 lg:px-[60px] py-20 border-b border-border relative z-[2]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[1px] bg-border">
        {stats.map((stat, i) => (
          <StatBox key={stat.label} stat={stat} delay={i} />
        ))}
      </div>
    </section>
  );
};

function StatBox({ stat, delay }: { stat: { prefix: string; value: number; suffix: string; label: string }; delay: number }) {
  const { count, ref } = useCountUp(stat.value);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.7, delay: delay * 0.12, ease: SMOOTH_EASE }}
      className="bg-mgbg p-8 lg:p-12 relative overflow-hidden group hover:bg-mgbg3 transition-colors">
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-mgaccent transition-all duration-500 group-hover:w-full" />
      <div className="font-head font-black text-foreground leading-none" style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)" }}>
        {stat.prefix && <sup className="text-mgaccent text-[1.8rem]">{stat.prefix}</sup>}
        {count}
        {stat.suffix && <sup className="text-mgaccent text-[1.8rem]">{stat.suffix}</sup>}
      </div>
      <div className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-mgmuted mt-3">{stat.label}</div>
    </motion.div>
  );
}
