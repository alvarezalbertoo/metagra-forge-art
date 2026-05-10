import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MapPin, Phone } from "lucide-react";
import metagraLogo from "@/assets/metagra-logo.png";
import linkedinIcon from "@/assets/linkedin.svg";

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
      {/* Zona superior — sedes */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr_1fr] gap-12 lg:gap-[60px] pb-12 border-b border-border">
        <div>
          <img src={metagraLogo} alt="Metagra Group" className="h-10 dark:brightness-100 brightness-90" />
          <p className="mt-4 text-[0.85rem] text-mgmuted leading-relaxed max-w-[280px]">
            {t("footer.desc")}
          </p>
          <a
            href="https://es.linkedin.com/company/metagra-group"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Metagra Group"
            className="group mt-6 inline-flex w-10 h-10 border border-border items-center justify-center text-mgsteel hover:bg-mgaccent hover:border-mgaccent transition-all duration-300"
          >
            <img
              src={linkedinIcon}
              alt=""
              className="w-5 h-5 [filter:brightness(0)] dark:[filter:brightness(0)_invert(1)] group-hover:[filter:brightness(0)_invert(1)] transition-[filter] duration-300"
            />
          </a>
        </div>

        {/* Sede España */}
        <div className="lg:border-l lg:border-border lg:pl-8 xl:pl-[60px]">
          <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-3">España · Bergara</div>
          <h5 className="font-head font-bold text-[1rem] uppercase tracking-[0.05em] text-foreground mb-4">{t("footer.sedePrincipal")}</h5>
          <div className="flex items-start gap-2.5 text-[0.85rem] text-mgmuted leading-relaxed mb-3">
            <MapPin size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-mgaccent" />
            <span>Amilaga, 22<br />20570 Bergara, Gipuzkoa</span>
          </div>
          <div className="flex items-center gap-2.5 text-[0.85rem] text-mgmuted">
            <Phone size={14} strokeWidth={1.5} className="text-mgaccent" />
            <a href="tel:+34943761348" className="hover:text-mgaccent transition-colors">+34 943 761 348</a>
          </div>
        </div>

        {/* Sede México */}
        <div className="lg:border-l lg:border-border lg:pl-8 xl:pl-[60px]">
          <div className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-mgaccent mb-3">México · Guanajuato</div>
          <h5 className="font-head font-bold text-[1rem] uppercase tracking-[0.05em] text-foreground mb-4">{t("footer.plantaProductiva")}</h5>
          <div className="flex items-start gap-2.5 text-[0.85rem] text-mgmuted leading-relaxed mb-3">
            <MapPin size={14} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 text-mgaccent" />
            <span>Parque Industrial La Amistad<br />38199 Guanajuato, México</span>
          </div>
          <div className="flex items-center gap-2.5 text-[0.85rem] text-mgmuted">
            <Phone size={14} strokeWidth={1.5} className="text-mgaccent" />
            {/* TODO: añadir teléfono México */}
            <span>—</span>
          </div>
        </div>
      </div>

      {/* Zona media — links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-[60px] py-12 border-b border-border">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h5 className="font-head font-bold text-[0.8rem] tracking-[0.2em] uppercase text-foreground mb-5">
              {title === "empresa" ? t("footer.empresa") : title === "tecnologias" ? t("footer.tecnologias") : t("footer.contacto")}
            </h5>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-[0.85rem] text-mgmuted hover:text-mgaccent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Zona inferior — copyright */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6">
        <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
          © {new Date().getFullYear()} Metagra Group · {t("footer.rights")}
        </p>
        <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-mgmuted">
          Cold Forging · Bergara · México
        </p>
      </div>
    </footer>
  );
};
