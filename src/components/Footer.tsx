import { Link } from "react-router-dom";
import metagraLogo from "@/assets/metagra-logo.png";

const footerLinks = {
  empresa: [
    { label: "Quiénes somos", href: "/grupo" },
    { label: "Instalaciones", href: "/grupo" },
    { label: "Equipo humano", href: "/grupo" },
    { label: "Medio ambiente", href: "/grupo" },
  ],
  tecnologias: [
    { label: "Estampación en frío", href: "/tecnologias/estampacion-en-frio" },
    { label: "Mecanizado", href: "/tecnologias/mecanizado" },
    { label: "Roscado", href: "/tecnologias/roscado" },
    { label: "I+D", href: "/tecnologias" },
  ],
  contacto: [
    { label: "Solicitar info", href: "/contacto" },
    { label: "Descargas", href: "/descargas" },
    { label: "Certificados", href: "/calidad" },
    { label: "Aviso legal", href: "/aviso-legal" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-mgbg2 border-t border-[rgba(255,255,255,0.07)] px-6 lg:px-[60px] pt-[60px] pb-8 relative z-[2]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[60px] pb-12 border-b border-[rgba(255,255,255,0.07)]">
        <div>
          <div className="font-head font-extrabold text-xl tracking-[0.12em] uppercase">
            <span className="text-foreground">META</span>
            <span className="text-mgaccent">GRA</span>
          </div>
          <p className="mt-4 text-[0.85rem] text-mgmuted leading-relaxed max-w-[240px]">
            Estampación en frío de precisión para la industria del automóvil. Bergara, Gipuzkoa.
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h5 className="font-head font-bold text-[0.8rem] tracking-[0.2em] uppercase text-foreground mb-5">
              {title === "empresa" ? "Empresa" : title === "tecnologias" ? "Tecnologías" : "Contacto"}
            </h5>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-[0.85rem] text-mgmuted hover:text-mgaccent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="font-mono text-[0.62rem] tracking-[0.1em] text-mgmuted">
          © 2025 Metagra Group · Todos los derechos reservados
        </p>
        <div className="flex gap-3">
          {["ES", "EN", "FR", "DE"].map((lang) => (
            <button
              key={lang}
              className="font-mono text-[0.62rem] tracking-[0.15em] uppercase text-mgmuted px-2.5 py-1 border border-[rgba(255,255,255,0.07)] hover:border-mgaccent hover:text-mgaccent transition-all"
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
};
