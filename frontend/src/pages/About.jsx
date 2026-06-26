import { useState } from "react";
import { motion } from "framer-motion";
import { Crosshair, Sparkles, LineChart, GraduationCap, Rocket, Globe, TrendingUp, Mail, Linkedin, ArrowRight } from "lucide-react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import ScrollProgress from "../components/landing/ScrollProgress";
import ContactDialog from "../components/landing/ContactDialog";
import CTASection from "../components/landing/CTASection";
import Reveal from "../components/landing/Reveal";
import CountUp from "../components/landing/CountUp";
import MagneticButton from "../components/landing/MagneticButton";
import { Seo, SITE } from "../components/Seo";

const FOUNDER = {
  name: "Geethika Sai Sunkara",
  role: "Founder & CEO, Vibify Marketing & PR",
  oneLiner: "From London with hustle — I help bold brands stop posting and start telling stories that stick.",
  photo: "/founder.jpg",
};

// Swap these when ready.
const LINKS = {
  linkedin: "https://www.linkedin.com/",
  x: "https://x.com/",
  email: "hello@vibifymarketing.com",
};

const highlights = [
  { icon: GraduationCap, label: "London-educated" },
  { icon: Rocket, stat: 25, suffix: "+", label: "Brands scaled" },
  { icon: Globe, label: "Global business acumen" },
  { icon: TrendingUp, label: "ROI-driven creativity" },
];

const pillars = [
  { icon: Crosshair, title: "Bullseye Targeting", desc: "No wasted ad spend. We find your people and speak their language." },
  { icon: Sparkles, title: "Main-Character Energy", desc: "We elevate your brand narrative so you're not just competing in your industry — you're leading it." },
  { icon: LineChart, title: "ROI-Driven Creativity", desc: "Aesthetics mean nothing if they don't move the needle. We back big ideas with hard data." },
];

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function About() {
  const [dialog, setDialog] = useState({ open: false, mode: "contact" });
  const openProject = () => setDialog({ open: true, mode: "contact" });
  const openBook = () => setDialog({ open: true, mode: "booking" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: FOUNDER.name,
    jobTitle: FOUNDER.role,
    image: `${SITE}${FOUNDER.photo}`,
    worksFor: { "@type": "Organization", name: "Vibify", url: SITE },
    url: `${SITE}/about`,
  };

  return (
    <div className="bg-ink text-textPrimary" data-testid="about-page">
      <Seo
        title={`About ${FOUNDER.name} — Vibify`}
        description="Meet Geethika Sai Sunkara, founder & CEO of Vibify. London-educated, globally minded, and obsessed with turning bold brands into the ones everyone's talking about."
        path="/about"
        image={`${SITE}${FOUNDER.photo}`}
        jsonLd={jsonLd}
      />
      <ScrollProgress />
      <Navbar onTalk={openProject} />

      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-10 h-80 w-80 rounded-full bg-violet/25 blur-[110px] animate-float-slow" />
          <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-cyan/20 blur-[110px] animate-float-slow" style={{ animationDelay: "-5s" }} />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 glass px-4 py-1.5 text-sm font-medium"
              data-testid="about-eyebrow"
            >
              <Sparkles className="h-4 w-4 text-cyan" />
              <span className="text-gradient">About the Founder</span>
            </motion.span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] tracking-tight" data-testid="about-name">
              Geethika <span className="text-gradient">Sai Sunkara</span>
            </h1>
            <p className="mt-4 font-display text-lg text-textPrimary/90">{FOUNDER.role}</p>
            <p className="mt-5 max-w-md text-lg text-textMuted">{FOUNDER.oneLiner}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <MagneticButton
                onClick={openProject} strength={0.3} data-testid="about-hero-cta"
                className="group inline-flex items-center gap-2 rounded-full bg-vibe-gradient px-7 py-4 font-semibold text-white glow-violet transition-transform hover:scale-105"
              >
                Start your project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <a
                href={`mailto:${LINKS.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:bg-white/5"
              >
                <Mail className="h-5 w-5" /> Get in touch
              </a>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-vibe-gradient opacity-30 blur-2xl" />
            <motion.div
              animate={{ y: [0, -14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 glass p-2"
            >
              <img src={FOUNDER.photo} alt={`${FOUNDER.name}, ${FOUNDER.role}`} className="h-[420px] w-full rounded-[1.4rem] object-cover object-top sm:h-[520px]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. BIO / STORY */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-display text-2xl sm:text-3xl lg:text-[2.4rem] leading-[1.3] font-medium tracking-tight">
              Let's be real: the digital space is crowded. Everyone is shouting, but very few are actually being <span className="text-gradient">heard.</span>
            </p>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-6 text-lg text-textMuted leading-relaxed">
              I started Vibify because I was tired of seeing incredible brands get lost in the noise. I wanted to help businesses stop just posting, and start telling stories that stick — making sure they hit the exact right audience, every single time.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-16 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">From London, with hustle.</h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-5 text-lg text-textMuted leading-relaxed">
              My approach isn't just theory; it's backed by serious global business exposure. I spent my university days studying in London — living and breathing one of the most fast-paced, culturally diverse, and competitive business hubs on the planet.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-4 text-lg text-textMuted leading-relaxed">
              That experience changed everything. It gave me a front-row seat to how world-class brands scale, innovate, and capture cultural moments. Living in a global melting pot taught me to read markets through a macro lens — understanding not just what people buy, but the psychology behind why they connect with certain brands.
            </p>
          </Reveal>

          <Reveal>
            <h2 className="mt-16 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">The vision <span className="text-textMuted text-3xl sm:text-4xl">(aka, how we win)</span></h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="mt-5 text-lg text-textMuted leading-relaxed">
              That global mindset is the literal DNA of this agency. We're not here to give you copy-and-paste strategies. We merge international business acumen with creative, trend-forward execution to deliver:
            </p>
          </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl gradient-border glass p-7"
                data-testid={`about-pillar-${i}`}
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-vibe-gradient/10 ring-1 ring-white/10">
                  <p.icon className="h-5 w-5 text-cyan" />
                </div>
                <h3 className="font-display text-2xl font-medium">{p.title}</h3>
                <p className="mt-2 text-textMuted">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HIGHLIGHTS */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={i}>
                <div className="flex h-full flex-col items-start gap-4 rounded-2xl border border-white/10 bg-surface/60 p-7" data-testid={`about-highlight-${i}`}>
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-vibe-gradient/10 ring-1 ring-white/10">
                    <h.icon className="h-5 w-5 text-magenta" />
                  </div>
                  {h.stat ? (
                    <div className="font-display text-4xl font-semibold text-gradient">
                      <CountUp to={h.stat} />{h.suffix}
                    </div>
                  ) : null}
                  <p className="font-display text-lg leading-snug">{h.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PULL-QUOTE */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal>
            <p className="mx-auto max-w-5xl font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
              Your brand has a story, and the world is waiting to hear it. <span className="text-gradient">Let's make some noise together.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. CONNECT */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">Let's <span className="text-gradient">connect</span></h2>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${LINKS.email}`}
                data-testid="about-email"
                className="group inline-flex items-center gap-2 rounded-full bg-vibe-gradient px-7 py-3.5 font-semibold text-white glow-violet transition-transform hover:scale-105"
              >
                <Mail className="h-5 w-5" /> Email me
              </a>
              <a
                href={LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                data-testid="about-linkedin"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition-colors hover:bg-white/5"
              >
                <Linkedin className="h-5 w-5" /> LinkedIn
              </a>
              <a
                href={LINKS.x} target="_blank" rel="noopener noreferrer"
                data-testid="about-x"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 font-semibold transition-colors hover:bg-white/5"
              >
                <XIcon className="h-4 w-4" /> X
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. CTA BAND */}
      <CTASection onBook={openBook} />

      <Footer onTalk={openProject} />
      <ContactDialog open={dialog.open} mode={dialog.mode} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))} />
    </div>
  );
}
