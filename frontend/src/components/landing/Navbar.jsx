import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { services } from "../../data/services";

const sectionLinks = [
  { label: "Work", to: "/#work" },
  { label: "About", to: "/#process" },
  { label: "Contact", to: "/#footer" },
];

export const Navbar = ({ onTalk }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

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
        <Link to="/" data-testid="logo-link" className="font-display text-2xl font-semibold tracking-tight">
          Vib<span className="text-gradient">ify</span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              data-testid="nav-services"
              className="flex items-center gap-1 text-sm font-medium text-textMuted hover:text-textPrimary transition-colors"
            >
              Services
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  data-testid="services-dropdown"
                  className="absolute left-1/2 top-full -translate-x-1/2 pt-4"
                >
                  <div className="grid w-[34rem] grid-cols-2 gap-1 rounded-2xl border border-white/10 glass p-3 shadow-2xl">
                    {services.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          data-testid={`dropdown-${s.slug}`}
                          className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white/5"
                        >
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-vibe-gradient/15 ring-1 ring-white/10">
                            <Icon className="h-4 w-4 text-cyan group-hover:text-magenta transition-colors" />
                          </span>
                          <span className="text-sm font-medium text-textPrimary">{s.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {sectionLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className="link-wipe text-sm font-medium text-textMuted hover:text-textPrimary transition-colors"
            >
              {l.label}
            </Link>
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
            <div className="flex flex-col px-6 py-4">
              <button
                onClick={() => setMobileServices((v) => !v)}
                className="flex items-center justify-between py-3 text-base text-textPrimary border-b border-white/5"
                data-testid="mobile-services-toggle"
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServices ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileServices && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-2"
                  >
                    {services.map((s) => {
                      const Icon = s.icon;
                      return (
                        <Link
                          key={s.slug}
                          to={`/services/${s.slug}`}
                          onClick={() => setOpen(false)}
                          data-testid={`mobile-dropdown-${s.slug}`}
                          className="flex items-center gap-3 py-2.5 text-sm text-textMuted"
                        >
                          <Icon className="h-4 w-4 text-cyan" />
                          {s.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
              {sectionLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-textPrimary border-b border-white/5"
                >
                  {l.label}
                </Link>
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
