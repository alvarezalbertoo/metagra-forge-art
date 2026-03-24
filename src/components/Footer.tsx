import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import metagraLogo from "@/assets/metagra-logo.png";

export const Footer = () => {
  const { t } = useTranslation();

  const footerLinks = {
    empresa: [
      { label: t("footer.quienes"), href: "/grupo" },
      { label: t("footer.instalaciones"), href: "/grupo" },
      { label: t("footer.equipo"), href: "/grupo" },
      { label: t("footer.medioambiente"), href: "/grupo" },
    ],
    tecnologias: [
      { label: t("footer.estampacion"), href: "/tecnologias" },
      { label: t("footer.mecanizado"), href: "/tecnologias" },
      { label: t("footer.roscado"), href: "/tecnologias" },
      { label: t("footer.utillaje"), href: "/tecnologias" },
    ],
    contacto: [
      { label: t("footer.solicitarInfo"), href: "/contacto" },
      { label: t("footer.calidadLink"), href: "/calidad" },
      { label: t("footer.sectoresLink"), href: "/sectores" },
    ],
  };

  return (
    <footer className="bg-mgbg2 border-t border-border px-6 lg:px-[60px] pt-[60px] pb-8 relative z-[2]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[60px] pb-12 border-b border-border">
        <div>
          <img src={metagraLogo} alt="Metagra Group" className="h-10 dark:brightness-100 brightness-90" />
          <p className="mt-4 text-[0.85rem] text-mgmuted leading-relaxed max-w-[240px]">
            {t("footer.desc")}
          </p>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h5 className="font-head font-bold text-[0.8rem] tracking-[0.2em] uppercase text-foreground mb-5">
              {title === "empresa" ? t("footer.empresa") : title === "tecnologias" ? t("footer.tecnologias") : t("footer.contacto")}
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
          © {new Date().getFullYear()} Metagra Group · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
};
