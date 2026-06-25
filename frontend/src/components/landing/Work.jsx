import { motion } from "framer-motion";
import Reveal from "./Reveal";

const work = [
  { img: "https://images.unsplash.com/photo-1512242712282-774a8bc0d9d3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", name: "Bold Launch", client: "Lumen", result: "+412% launch-week reach", tall: true },
  { img: "https://images.pexels.com/photos/11034423/pexels-photo-11034423.jpeg?auto=compress&cs=tinysrgb&w=1200", name: "Gen-Z Takeover", client: "Pulse", result: "1.2M new followers" },
  { img: "https://images.unsplash.com/photo-1661659739121-bfdc4223280d?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", name: "Outdoor Domination", client: "Vertex", result: "84M impressions" },
  { img: "https://images.pexels.com/photos/8638608/pexels-photo-8638608.jpeg?auto=compress&cs=tinysrgb&w=1200", name: "Creator Network", client: "Halo", result: "320% ROI on spend", tall: true },
  { img: "https://images.unsplash.com/photo-1744686909358-915e14866592?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", name: "Content Engine", client: "Drift", result: "600+ assets shipped" },
  { img: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", name: "PR Blitz", client: "Orbit", result: "47 press features" },
];

export const Work = () => {
  return (
    <section id="work" data-testid="work-section" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.25em] text-magenta">Our work</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
              Campaigns that <span className="text-gradient">broke through.</span>
            </h2>
          </div>
          <p className="max-w-sm text-textMuted">
            A snapshot of brands we made impossible to ignore. Your case study could be next.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[280px]">
          {work.map((w, i) => (
            <Reveal
              key={i}
              delay={i % 3}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 ${w.tall ? "lg:row-span-2 lg:!h-auto" : ""}`}
            >
              <div className="h-full w-full" data-testid={`work-card-${i}`}>
                <img
                  src={w.img}
                  alt={`${w.name} campaign for ${w.client}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
                <motion.div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-xs uppercase tracking-widest text-cyan">{w.client}</p>
                  <h3 className="mt-1 font-display text-2xl font-medium">{w.name}</h3>
                  <p className="mt-1 max-h-0 overflow-hidden text-textMuted opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">
                    {w.result}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
