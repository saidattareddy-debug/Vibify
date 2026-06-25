import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#process" },
  { label: "Contact", href: "#footer" },
];

export const Navbar = ({ onTalk }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/10 py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" data-testid="logo-link" className="font-display text-2xl font-semibold tracking-tight">
          Vib<span className="text-gradient">ify</span>
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="link-wipe text-sm font-medium text-textMuted hover:text-textPrimary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton
            onClick={onTalk}
            data-testid="nav-talk-button"
            className="hidden sm:inline-flex rounded-full bg-vibe-gradient px-5 py-2.5 text-sm font-semibold text-white transition-shadow hover:glow-violet"
          >
            Let's talk
          </MagneticButton>
          <button
            className="md:hidden text-textPrimary"
            onClick={() => setOpen((v) => !v)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass border-t border-white/10"
            data-testid="mobile-menu"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-textPrimary border-b border-white/5"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => { setOpen(false); onTalk(); }}
                className="mt-4 rounded-full bg-vibe-gradient px-5 py-3 font-semibold text-white"
                data-testid="mobile-talk-button"
              >
                Let's talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
