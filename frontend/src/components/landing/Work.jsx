import { m as motion } from "framer-motion";
import Reveal from "./Reveal";

// w/h preserve native aspect ratio so the browser reserves space (no CLS).
// Each image has 3 derived sizes: 400w + 800w in WebP/AVIF/JPG fallback.
const work = [
  { name: "Black Coffee — Live", client: "Headline Act",       result: "+412% reach", file: "work-8", w: 1080, h: 1350, tall: true },
  { name: "Laser Nights",        client: "Event Curation",     result: "+356% reach", file: "work-1", w: 1024, h: 1280 },
  { name: "Arena Live",          client: "Event Curation",     result: "+298% reach", file: "work-5", w: 1080, h: 741 },
  { name: "Mainstage Takeover",  client: "Event Curation",     result: "+340% reach", file: "work-2", w: 1024, h: 1280, tall: true },
  { name: "Laser Sessions",      client: "Event Curation",     result: "+264% reach", file: "work-7", w: 1080, h: 741 },
  { name: "Festival Grounds",    client: "Event Curation",     result: "+228% reach", file: "work-3", w: 1024, h: 1280 },
  { name: "Club Series",         client: "Event Curation",     result: "+310% reach", file: "work-4", w: 1024, h: 1280 },
  { name: "Aurora Set",          client: "Event Curation",     result: "+196% reach", file: "work-6", w: 1080, h: 741 },
  { name: "Crowd Energy",        client: "Event Curation",     result: "+278% reach", file: "work-9", w: 1080, h: 1350 },
];

// Each card paints at ~365px on desktop; phones get the smaller 400w asset.
const SIZES = "(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 32vw";

const srcset = (file, ext) =>
  `/works/optimized/${file}-400.${ext} 400w, /works/optimized/${file}-800.${ext} 800w`;

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
                <picture>
                  <source
                    type="image/avif"
                    srcSet={srcset(w.file, "avif")}
                    sizes={SIZES}
                  />
                  <source
                    type="image/webp"
                    srcSet={srcset(w.file, "webp")}
                    sizes={SIZES}
                  />
                  <img
                    src={`/works/optimized/${w.file}-800.jpg`}
                    srcSet={srcset(w.file, "jpg")}
                    sizes={SIZES}
                    width={w.w}
                    height={w.h}
                    alt={`${w.name} campaign for ${w.client}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </picture>
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
