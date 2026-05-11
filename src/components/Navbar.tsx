import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/ThemeProvider";
import metagraLogo from "@/assets/metagra-logo.png";
import linkedinIcon from "@/assets/linkedin.svg";

const languages = [
  { code: "es", label: "ES" },
  { code: "eu", label: "EU" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t("nav.inicio", "Inicio"), href: "#inicio" },
    { label: t("nav.servicios", "Servicios"), href: "#servicios" },
    { label: t("nav.calidad", "Calidad"), href: "#calidad" },
    { label: t("nav.instalaciones", "Instalaciones"), href: "#instalaciones" },
    { label: t("nav.sectores", "Sectores"), href: "#sectores" },
    { label: t("nav.contacto", "Contacto"), href: "#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLangOpen(false);
  }, [location.pathname]);

  const currentLang = i18n.language?.substring(0, 2).toUpperCase() || "ES";

  const scrollToHash = (href: string) => {
    const id = href.replace(/^#/, "");
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Skip-to-content: invisible hasta que recibe foco — esencial para teclado y lectores de pantalla */}
      <a
        href="#inicio"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-mgaccent focus:text-white focus:font-head focus:font-bold focus:text-sm focus:uppercase focus:tracking-wide focus:rounded-full"
      >
        Saltar al contenido principal
      </a>

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] px-6 lg:px-[60px] h-[72px] flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? "bg-mgbg/90 backdrop-blur-2xl border-b border-border"
            : "bg-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src={metagraLogo} alt="Metagra Group" className="h-12 lg:h-14 w-auto dark:brightness-100 brightness-90" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash(link.href);
                }}
                className="font-head text-[0.85rem] font-semibold tracking-[0.15em] uppercase text-mgsteel hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-mgaccent after:transition-all after:duration-300 hover:after:w-full cursor-pointer"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme toggle - sin borde */}
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center text-mgsteel hover:text-mgaccent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
          </button>

          {/* Language switcher - sin borde */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="h-10 px-3 flex items-center gap-1.5 text-mgsteel hover:text-mgaccent transition-colors font-mono text-[0.7rem] tracking-[0.18em]"
            >
              <Globe size={15} strokeWidth={1.5} />
              {currentLang}
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-mgbg border border-border shadow-lg overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className={`block w-full px-5 py-2.5 text-left font-mono text-[0.65rem] tracking-[0.15em] transition-colors ${
                        currentLang === lang.label
                          ? "bg-mgaccent text-white"
                          : "text-mgsteel hover:bg-mgbg3 hover:text-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* LinkedIn - badge directo, sin contenedor con borde */}
          <a
            href="https://es.linkedin.com/company/metagra-group"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn de Metagra Group (abre en nueva pestaña)"
            className="hidden lg:inline-flex items-center justify-center hover:opacity-80 hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mgaccent"
          >
            <img src={linkedinIcon} alt="" aria-hidden="true" className="w-9 h-9" />
          </a>

          {/* Botón Contacto - píldora redondeada, misma altura que LinkedIn (36px) */}
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); scrollToHash("#contacto"); }}
            className="hidden lg:inline-flex items-center h-9 px-6 rounded-full bg-mgaccent text-white font-head font-bold text-[0.78rem] tracking-[0.18em] uppercase hover:bg-mgaccent2 hover:shadow-lg hover:shadow-mgaccent/25 hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mgaccent"
          >
            {t("nav.contacto")}
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-foreground"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] bg-mgbg pt-20 px-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  setTimeout(() => scrollToHash(link.href), 350);
                }}
                className="font-head text-2xl font-bold tracking-[0.1em] uppercase text-mgsteel hover:text-foreground transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault();
                setMobileOpen(false);
                setTimeout(() => scrollToHash("#contacto"), 350);
              }}
              className="font-head font-bold text-lg tracking-[0.18em] uppercase px-6 py-3 border border-mgaccent text-mgaccent hover:bg-mgaccent hover:text-white transition-all mt-4 text-center"
            >
              {t("nav.contacto")}
            </a>
            <div className="flex gap-2 mt-4">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    i18n.changeLanguage(lang.code);
                  }}
                  className={`font-mono text-[0.7rem] tracking-[0.15em] px-3 py-2 border transition-all ${
                    currentLang === lang.label
                      ? "border-mgaccent bg-mgaccent text-white"
                      : "border-border text-mgsteel hover:border-mgaccent"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
