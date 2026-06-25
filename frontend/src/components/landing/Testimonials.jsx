import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { quote: "Vibify curated our launch event end to end — the room, the guest list, the energy. It wasn't just an event, it was a moment people are still talking about.", name: "Chanukya", role: "" },
  { quote: "Every detail was intentional, from the first invite to the final encore. Our brand activation pulled a crowd we couldn't have dreamed of.", name: "Sandeep", role: "" },
  { quote: "They turned a simple product launch into a full-blown experience. The curation, staging, and press pull were absolutely flawless.", name: "Shashidhar", role: "" },
  { quote: "Vibify makes events that trend. Ours sold out, and the after-buzz did our marketing for us for weeks.", name: "Yash", role: "" },
];

export const Testimonials = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section data-testid="testimonials-section" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-violet/20 blur-[120px]" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan">Loved by founders</p>
        <div className="relative mt-10 min-h-[260px] sm:min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              data-testid="testimonial-card"
              className="rounded-3xl border border-white/10 glass p-8 sm:p-12"
            >
              <Quote className="mx-auto mb-6 h-10 w-10 text-magenta" />
              <p className="font-display text-2xl sm:text-3xl font-medium leading-snug text-textPrimary">
                "{testimonials[idx].quote}"
              </p>
              <div className="mt-8">
                <p className="font-semibold text-textPrimary">{testimonials[idx].name}</p>
                {testimonials[idx].role && <p className="text-textMuted">{testimonials[idx].role}</p>}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              data-testid={`testimonial-dot-${i}`}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-vibe-gradient" : "w-2 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
