import { ReactNode } from "react";

interface Props {
  number: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "light";
}

export const SectionLabel = ({ number, children, className = "", variant = "default" }: Props) => {
  const colorClass = variant === "light" ? "text-white" : "text-mgaccent";
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <span className={`font-mono text-[0.78rem] tracking-[0.2em] ${colorClass}`}>{number}</span>
      <span className={`w-7 h-[1px] ${variant === "light" ? "bg-white" : "bg-mgaccent"}`} />
      <span className={`font-mono text-[0.7rem] tracking-[0.22em] uppercase ${colorClass}`}>{children}</span>
    </div>
  );
};
