import { motion } from "framer-motion";
import {
  Target, Megaphone, Share2, Users, Palette, BarChart3, Code2, Building2,
} from "lucide-react";

const services = [
  { icon: Target, title: "Brand Strategy", desc: "Positioning, identity, and messaging that make brands unforgettable." },
  { icon: Megaphone, title: "Public Relations", desc: "Earned media, press, and reputation that put you in the spotlight." },
  { icon: Share2, title: "Social Media Marketing", desc: "Scroll-stopping content and community growth across every platform." },
  { icon: Users, title: "Influencer Campaigns", desc: "Creator partnerships that turn reach into real results." },
  { icon: Palette, title: "Content & Creative", desc: "Bold visuals, video, and copy that define your voice." },
  { icon: BarChart3, title: "Performance Ads", desc: "Data-driven paid campaigns engineered for measurable ROI." },
  { icon: Code2, title: "Website Development", desc: "Fast, beautiful, conversion-focused websites built to impress and perform." },
  { icon: Building2, title: "PropTech", desc: "Marketing and digital products purpose-built for real estate and property brands." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.12 },
  }),
};

export const Services = () => {
  return (
    <section id="services" data-testid="services-section" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-[0.25em] text-cyan"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
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
              key={s.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8 }}
              data-testid={`service-card-${i}`}
              className="group relative overflow-hidden rounded-2xl gradient-border glass p-7 transition-shadow duration-300 hover:shadow-[0_20px_60px_-20px_rgba(124,58,237,0.5)]"
            >
              <span className="pointer-events-none absolute top-0 left-0 h-full w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[320%]" />
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-vibe-gradient/10 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <s.icon className="h-6 w-6 text-cyan group-hover:text-magenta transition-colors" />
              </div>
              <h3 className="font-display text-2xl font-medium text-textPrimary">{s.title}</h3>
              <p className="mt-3 text-textMuted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
