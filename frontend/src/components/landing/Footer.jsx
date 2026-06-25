import { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Instagram, Linkedin, Youtube, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { submitNewsletter } from "../../lib/api";
import { services } from "../../data/services";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const socials = [
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

const companyLinks = [
  { label: "Services", to: "/#services" },
  { label: "Work", to: "/#work" },
  { label: "About", to: "/#process" },
  { label: "Contact", to: "/#footer" },
];

export const Footer = ({ onTalk }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done

  const subscribe = async (e) => {
    e.preventDefault();
    if (!isEmail(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setState("loading");
    try {
      await submitNewsletter(email);
      setState("done");
      toast.success("You're subscribed! 🎉");
      setEmail("");
    } catch {
      setState("idle");
      toast.error("Subscription failed. Try again.");
    }
  };

  return (
    <footer id="footer" data-testid="footer" className="relative border-t border-white/10 bg-ink pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr]">
          <div>
            <Link to="/" className="font-display text-3xl font-semibold tracking-tight">
              Vib<span className="text-gradient">ify</span>
            </Link>
            <p className="mt-4 max-w-xs text-textMuted">
              The marketing & PR agency that turns attention into momentum.
            </p>
            <a
              href="tel:+918008391241"
              data-testid="footer-phone"
              className="mt-4 inline-block text-textMuted transition-colors hover:text-textPrimary link-wipe"
            >
              +91 80083 91241
            </a>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#footer"
                  aria-label={s.label}
                  data-testid={`social-${s.label.toLowerCase()}`}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-textMuted transition-colors hover:border-violet hover:text-textPrimary"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company column */}
          <div>
            <h4 className="font-display text-lg">Company</h4>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="link-wipe text-textMuted hover:text-textPrimary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column — all 8 */}
          <div>
            <h4 className="font-display text-lg">Services</h4>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    data-testid={`footer-service-${s.slug}`}
                    className="link-wipe text-textMuted hover:text-textPrimary transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg">Stay in the loop</h4>
            <p className="mt-4 text-textMuted">Marketing insights, no spam. Unsubscribe anytime.</p>
            <form onSubmit={subscribe} className="mt-5 flex gap-2" noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@brand.com"
                data-testid="newsletter-input"
                className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-textPrimary outline-none placeholder:text-textMuted/60 focus:border-violet"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                data-testid="newsletter-submit"
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-vibe-gradient text-white transition-transform hover:scale-105 disabled:opacity-70"
                aria-label="Subscribe"
              >
                {state === "loading" ? <Loader2 className="h-5 w-5 animate-spin" /> : state === "done" ? <Check className="h-5 w-5" /> : "→"}
              </button>
            </form>
            <button
              onClick={onTalk}
              className="mt-5 text-sm font-semibold text-gradient"
              data-testid="footer-talk-button"
            >
              Or just say hello →
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-textMuted">© 2024 Vibify. All rights reserved.</p>
          <p className="text-sm text-textMuted">Made to be impossible to ignore.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
