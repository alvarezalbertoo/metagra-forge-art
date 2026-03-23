import type { Variants } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [...EASE] },
  }),
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [...EASE] } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export const SMOOTH_EASE = [...EASE] as [number, number, number, number];
