import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/ThemeProvider";
import metagraLogo from "@/assets/metagra-logo.png";

const languages = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "de", label: "DE" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: t("nav.grupo"), href: "/grupo" },
    { label: t("nav.tecnologias"), href: "/tecnologias" },
    { label: t("nav.sectores"), href: "/sectores" },
    { label: t("nav.calidad"), href: "/calidad" },
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

  return (
    <>
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
        <Link to="/">
          <img src={metagraLogo} alt="Metagra Group" className="h-10 dark:brightness-100 brightness-90" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-9 list-none">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="font-head text-[0.85rem] font-semibold tracking-[0.15em] uppercase text-mgsteel hover:text-foreground transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-mgaccent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center border border-border text-mgsteel hover:text-foreground hover:border-mgaccent transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>

          {/* Language switcher */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="h-9 px-3 flex items-center gap-1.5 border border-border text-mgsteel hover:text-foreground hover:border-mgaccent transition-all font-mono text-[0.65rem] tracking-[0.15em]"
            >
              <Globe size={14} strokeWidth={1.5} />
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

          <Link
            to="/contacto"
            className="hidden lg:inline-block font-head font-bold text-[0.8rem] tracking-[0.18em] uppercase px-6 py-2.5 border border-mgaccent text-mgaccent hover:bg-mgaccent hover:text-white transition-all duration-300"
          >
            {t("nav.contacto")}
          </Link>

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
              <Link
                key={link.href}
                to={link.href}
                className="font-head text-2xl font-bold tracking-[0.1em] uppercase text-mgsteel hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contacto"
              className="font-head font-bold text-lg tracking-[0.18em] uppercase px-6 py-3 border border-mgaccent text-mgaccent hover:bg-mgaccent hover:text-white transition-all mt-4 text-center"
            >
              {t("nav.contacto")}
            </Link>
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
