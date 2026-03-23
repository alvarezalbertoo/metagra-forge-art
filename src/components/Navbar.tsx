import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Grupo", href: "/grupo" },
  { label: "Tecnologías", href: "/tecnologias" },
  { label: "Sectores", href: "/sectores" },
  { label: "Calidad", href: "/calidad" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] px-6 lg:px-[60px] h-[72px] flex items-center justify-between transition-all duration-400 ${
          scrolled
            ? "bg-[rgba(10,11,13,0.9)] backdrop-blur-2xl border-b border-[rgba(255,255,255,0.07)]"
            : "bg-transparent"
        }`}
      >
        <Link to="/" className="font-head font-extrabold text-2xl tracking-[0.12em] uppercase">
          <span className="text-foreground">META</span>
          <span className="text-mgaccent">GRA</span>
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

        <div className="flex items-center gap-4">
          <Link
            to="/contacto"
            className="hidden lg:inline-block font-head font-bold text-[0.8rem] tracking-[0.18em] uppercase px-6 py-2.5 border border-mgaccent text-mgaccent hover:bg-mgaccent hover:text-foreground transition-all duration-300"
          >
            Contacto
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
              className="font-head font-bold text-lg tracking-[0.18em] uppercase px-6 py-3 border border-mgaccent text-mgaccent hover:bg-mgaccent hover:text-foreground transition-all mt-4 text-center"
            >
              Contacto
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
