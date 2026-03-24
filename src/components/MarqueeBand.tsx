import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export const MarqueeBand = () => {
  const { t } = useTranslation();
  const items = t("marquee.items", { returnObjects: true }) as string[];
  const doubled = [...items, ...items];

  return (
    <div className="bg-mgaccent overflow-hidden py-3.5 relative z-[2]">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-head font-bold text-[0.8rem] tracking-[0.25em] uppercase text-[rgba(255,255,255,0.9)] whitespace-nowrap px-10">
              {item}
            </span>
            <span className="text-[rgba(255,255,255,0.4)]">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
