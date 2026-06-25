import CountUp from "./CountUp";
import Reveal from "./Reveal";

const stats = [
  { to: 250, suffix: "+", label: "Brands launched", decimals: 0 },
  { to: 1.2, suffix: "B+", label: "Impressions generated", decimals: 1 },
  { to: 320, suffix: "%", label: "Average growth", decimals: 0 },
];

export const Stats = () => {
  return (
    <section id="stats" data-testid="stats-section" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-10 sm:p-14">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan/20 blur-3xl" />
          <div className="relative grid gap-12 sm:grid-cols-3 text-center sm:text-left">
            {stats.map((s, i) => (
              <div key={i} data-testid={`stat-${i}`}>
                <div className="font-display text-5xl sm:text-6xl font-semibold text-gradient">
                  <CountUp to={s.to} decimals={s.decimals} />
                  {s.suffix}
                </div>
                <p className="mt-3 text-textMuted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Stats;
