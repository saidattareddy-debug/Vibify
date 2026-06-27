import { m as motion } from "framer-motion";
import { Search, PenTool, Rocket, TrendingUp } from "lucide-react";

const steps = [
  { icon: Search, title: "Discover", desc: "We dig into your brand, audience, and market to find the angle no one else sees." },
  { icon: PenTool, title: "Strategize", desc: "We craft a sharp, channel-ready plan built around bold creative and clear goals." },
  { icon: Rocket, title: "Launch", desc: "We ship campaigns fast, with content engineered to stop the scroll." },
  { icon: TrendingUp, title: "Amplify", desc: "We double down on what works, optimizing toward measurable momentum." },
];

export const Process = () => {
  return (
    <section id="process" data-testid="process-section" className="relative py-24 sm:py-32 bg-surface/30 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-violet">How we work</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            From idea to <span className="text-gradient">irresistible.</span>
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden lg:block h-px bg-gradient-to-r from-violet via-magenta to-cyan opacity-40" />
          <div className="grid gap-10 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
                data-testid={`process-step-${i}`}
              >
                <div className="relative z-10 mb-6 grid h-14 w-14 place-items-center rounded-full bg-ink ring-1 ring-white/15">
                  <s.icon className="h-6 w-6 text-cyan" />
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-vibe-gradient text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium">{s.title}</h3>
                <p className="mt-3 text-textMuted leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
