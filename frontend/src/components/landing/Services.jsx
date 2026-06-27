import { m as motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { services } from "../../data/services-summary";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.12 },
  }),
};

export const Services = ({ onTalk }) => {
  const reduced = useReducedMotion();
  const cardInitial = reduced ? false : "hidden";

  return (
    <section id="services" data-testid="services-section" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.25em] text-cyan"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight"
          >
            Full-spectrum growth, <span className="text-gradient">engineered to be loud.</span>
          </motion.h2>
          <p className="mt-5 text-lg text-textMuted">
            From the first headline to the final conversion, we build campaigns the internet can't scroll past.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              custom={i}
              variants={cardVariants}
              initial={cardInitial}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8 }}
            >
              <Link
                to={`/services/${s.slug}`}
                data-testid={`service-card-${i}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl gradient-border glass p-7 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.5)]"
              >
                <span className="pointer-events-none absolute top-0 left-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-textMuted transition-all group-hover:text-magenta group-hover:rotate-45" />
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-vibe-gradient/10 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <s.icon className="h-6 w-6 text-cyan group-hover:text-magenta transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-medium text-textPrimary">{s.name}</h3>
                <p className="mt-3 text-textMuted leading-relaxed">{s.subhead}</p>
              </Link>
            </motion.div>
          ))}

          {/* 9th gradient CTA tile fills the empty slot */}
          <motion.div
            custom={services.length}
            variants={cardVariants}
            initial={cardInitial}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -8 }}
          >
            <button
              onClick={onTalk}
              data-testid="services-cta-tile"
              className="group relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl bg-vibe-gradient-animated animate-gradient-shift p-7 text-left text-white transition-transform"
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, white, transparent 45%)" }} />
              <div className="relative">
                <h3 className="font-display text-2xl font-medium leading-tight">Not sure where to start?</h3>
                <p className="mt-3 text-white/85">Tell us your goals — we'll map the play.</p>
              </div>
              <span className="relative mt-6 inline-flex items-center gap-2 font-semibold">
                Let's talk
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
