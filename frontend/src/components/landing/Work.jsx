import { motion } from "framer-motion";
import Reveal from "./Reveal";

const work = [
  { img: "/works/work-8.jpg", name: "Black Coffee — Live", client: "Headline Act", result: "+412% reach", tall: true },
  { img: "/works/work-1.jpg", name: "Laser Nights", client: "Event Curation", result: "+356% reach" },
  { img: "/works/work-5.jpg", name: "Arena Live", client: "Event Curation", result: "+298% reach" },
  { img: "/works/work-2.jpg", name: "Mainstage Takeover", client: "Event Curation", result: "+340% reach", tall: true },
  { img: "/works/work-7.jpg", name: "Laser Sessions", client: "Event Curation", result: "+264% reach" },
  { img: "/works/work-3.jpg", name: "Festival Grounds", client: "Event Curation", result: "+228% reach" },
  { img: "/works/work-4.jpg", name: "Club Series", client: "Event Curation", result: "+310% reach" },
  { img: "/works/work-6.jpg", name: "Aurora Set", client: "Event Curation", result: "+196% reach" },
  { img: "/works/work-9.jpg", name: "Crowd Energy", client: "Event Curation", result: "+278% reach" },
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
            A snapshot of brands we made impossible to ignore. Your brand could be next.
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
