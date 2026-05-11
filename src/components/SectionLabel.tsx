import { ReactNode } from "react";

interface Props {
  number?: string; // opcional, ya no se muestra (mantengo para no romper imports)
  children: ReactNode;
  className?: string;
  variant?: "default" | "light";
}

export const SectionLabel = ({ children, className = "", variant = "default" }: Props) => {
  const colorClass = variant === "light" ? "text-white" : "text-mgaccent";
  const lineClass = variant === "light" ? "bg-white" : "bg-mgaccent";
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <span className={`w-7 h-[1px] ${lineClass}`} />
      <span className={`font-mono text-[0.7rem] tracking-[0.22em] uppercase ${colorClass}`}>
        {children}
      </span>
    </div>
  );
};
