import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SMOOTH_EASE } from "@/lib/animations";

export const PullQuote = () => {
  const { t } = useTranslation();
  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: SMOOTH_EASE }}
      className="py-[120px] lg:py-[160px] px-6 lg:px-[60px] border-y border-border bg-mgbg2/50 relative z-[2]"
    >
      <div className="max-w-[980px] mx-auto text-center">
        <blockquote
          className="font-head font-bold uppercase leading-[1] tracking-tight text-foreground"
          style={{ fontSize: "clamp(2rem, 4.8vw, 4.2rem)" }}
          dangerouslySetInnerHTML={{ __html: t("pullquote.text") }}
        />
      </div>
    </motion.section>
  );
};
