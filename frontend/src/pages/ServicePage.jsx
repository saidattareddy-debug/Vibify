import { useState, Fragment } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getService, services } from "../data/services";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";
import ScrollProgress from "../components/landing/ScrollProgress";
import ContactDialog from "../components/landing/ContactDialog";
import Reveal from "../components/landing/Reveal";
import CountUp from "../components/landing/CountUp";
import MagneticButton from "../components/landing/MagneticButton";
import { Seo, SITE } from "../components/Seo";

const wordContainer = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const wordItem = { hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

const WordReveal = ({ text, className = "" }) => (
  <motion.span variants={wordContainer} initial="hidden" animate="show" className={`inline-block ${className}`} aria-label={text}>
    {text.split(" ").map((w, i) => (
      <Fragment key={i}>
        <span className="inline-block overflow-hidden pb-[0.08em]" aria-hidden="true">
          <motion.span variants={wordItem} className="inline-block">{w}</motion.span>
        </span>{" "}
      </Fragment>
    ))}
  </motion.span>
);

export default function ServicePage() {
  const { slug } = useParams();
  const service = getService(slug);
  const [dialog, setDialog] = useState({ open: false, mode: "contact" });

  if (!service) return <Navigate to="/" replace />;

  const Icon = service.icon;
  const openProject = () => setDialog({ open: true, mode: "contact" });
  const openBook = () => setDialog({ open: true, mode: "booking" });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const related = service.related.map((s) => getService(s)).filter(Boolean);

  const path = `/services/${service.slug}`;
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.category,
    description: service.seo.description,
    url: `${SITE}${path}`,
    image: service.images.hero,
    provider: {
      "@type": "Organization",
      name: "Vibify",
      url: SITE,
    },
    areaServed: "Worldwide",
  };

  return (
    <div className="bg-ink text-textPrimary" data-testid={`service-page-${service.slug}`}>
      <Seo
        title={service.seo.title}
        description={service.seo.description}
        path={path}
        image={service.images.hero}
        jsonLd={serviceJsonLd}
      />      <ScrollProgress />
      <Navbar onTalk={openProject} />

      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-40 sm:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -left-10 h-80 w-80 rounded-full bg-violet/25 blur-[110px] animate-float-slow" />
          <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-cyan/20 blur-[110px] animate-float-slow" style={{ animationDelay: "-5s" }} />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 glass px-4 py-1.5 text-sm font-medium"
              data-testid="service-eyebrow"
            >
              <Icon className="h-4 w-4 text-cyan" />
              <span className="text-gradient">{service.category}</span>
            </motion.span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[0.98] tracking-tight" data-testid="service-headline">
              <WordReveal text={service.headline} />
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 max-w-md text-lg text-textMuted"
            >
              {service.subhead}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <MagneticButton
                onClick={openProject} strength={0.3} data-testid="service-start-cta"
                className="group inline-flex items-center gap-2 rounded-full bg-vibe-gradient px-7 py-4 font-semibold text-white glow-violet transition-transform hover:scale-105"
              >
                Start your project
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <button
                onClick={() => scrollTo("showcase")} data-testid="service-work-cta"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 font-semibold transition-colors hover:bg-white/5"
              >
                See related work
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-vibe-gradient opacity-30 blur-2xl" />
            <motion.div
              animate={{ y: [0, -14, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative overflow-hidden rounded-[1.75rem] border border-white/10 glass p-2"
            >
              <img src={service.images.hero} alt={`${service.name} hero`} className="h-[340px] w-full rounded-[1.4rem] object-cover sm:h-[460px]" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <p className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.2] font-medium tracking-tight">
              {service.intro.split(". ").map((part, i, arr) => (
                <span key={i} className={i === 0 ? "text-textPrimary" : "text-textMuted"}>
                  {part}{i < arr.length - 1 ? ". " : ""}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3. WHAT WE DO */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-cyan">What we do</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">
              Everything <span className="text-gradient">{service.name.toLowerCase()}</span> needs.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {service.whatWeDo.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl gradient-border glass p-7"
                data-testid={`service-feature-${i}`}
              >
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-vibe-gradient/10 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-6 w-6 text-cyan group-hover:text-magenta transition-colors" />
                </div>
                <h3 className="font-display text-xl font-medium">{f.title}</h3>
                <p className="mt-2 text-textMuted">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PROCESS */}
      <section className="relative py-16 sm:py-24 border-y border-white/10 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-violet">How we work</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">The path to <span className="text-gradient">results.</span></h2>
          </Reveal>
          <div className="relative mt-14">
            <div className="absolute left-0 right-0 top-7 hidden lg:block h-px bg-gradient-to-r from-violet via-magenta to-cyan opacity-40" />
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`service-process-${i}`}
                >
                  <div className="relative z-10 mb-5 grid h-14 w-14 place-items-center rounded-full bg-ink ring-1 ring-white/15">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-vibe-gradient text-sm font-bold text-white">{i + 1}</span>
                  </div>
                  <h3 className="font-display text-xl font-medium">{s.title}</h3>
                  <p className="mt-2 text-textMuted">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SHOWCASE */}
      <section id="showcase" className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.25em] text-magenta">In action</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-semibold tracking-tight">Work that <span className="text-gradient">speaks.</span></h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:auto-rows-[230px]">
            {service.images.showcase.map((img, i) => (
              <Reveal
                key={i} delay={i}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
              >
                <div className="h-full w-full" data-testid={`service-showcase-${i}`}>
                  <img src={img} alt={service.images.captions[i]} loading="lazy" className="h-full w-full min-h-[230px] object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                  <div className="absolute bottom-0 p-6">
                    <p className="font-display text-xl font-medium translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {service.images.captions[i]}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RESULTS */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-10 sm:p-14">
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-magenta/25 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-violet/25 blur-3xl" />
            <div className="relative grid gap-12 sm:grid-cols-3 text-center sm:text-left">
              {service.stats.map((s, i) => (
                <div key={i} data-testid={`service-stat-${i}`}>
                  <div className="font-display text-5xl sm:text-6xl font-semibold text-gradient">
                    {s.prefix || ""}
                    <CountUp to={s.to} decimals={s.decimals || 0} />
                    {s.suffix}
                  </div>
                  <p className="mt-3 text-textMuted">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. RELATED */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">Explore more <span className="text-gradient">services</span></h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {related.map((r, i) => {
              const RIcon = r.icon;
              return (
                <Reveal key={r.slug} delay={i}>
                  <Link
                    to={`/services/${r.slug}`}
                    data-testid={`related-${r.slug}`}
                    className="group flex h-full items-start justify-between gap-4 rounded-2xl gradient-border glass p-7 transition-transform hover:-translate-y-2"
                  >
                    <div>
                      <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-vibe-gradient/10 ring-1 ring-white/10">
                        <RIcon className="h-5 w-5 text-cyan" />
                      </div>
                      <h3 className="font-display text-xl font-medium">{r.name}</h3>
                      <p className="mt-2 text-sm text-textMuted">{r.subhead}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-textMuted transition-all group-hover:text-magenta group-hover:rotate-45" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="relative px-6 py-16">
        <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-vibe-gradient-animated animate-gradient-shift p-12 sm:p-20 text-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white, transparent 40%)" }} />
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white drop-shadow">
              Let's make it impossible to ignore.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-white/85">
              Tell us about your goals — your first strategy call is on us.
            </p>
            <MagneticButton
              onClick={openBook} strength={0.3} data-testid="service-book-cta"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-white transition-transform hover:scale-105"
            >
              Book a free strategy call
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </div>
        </Reveal>
      </section>

      <Footer onTalk={openProject} />
      <ContactDialog open={dialog.open} mode={dialog.mode} onOpenChange={(open) => setDialog((d) => ({ ...d, open }))} />
    </div>
  );
}

export { services };
