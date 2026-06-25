import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  { quote: "Vibify didn't just market our launch — they made it an event. We sold out in 48 hours.", name: "Maya Chen", role: "CMO, Quake" },
  { quote: "The most creative, fastest-moving team we've ever worked with. Our reach 4x'd in a quarter.", name: "Daniel Okafor", role: "Founder, Big Bull" },
  { quote: "They understand attention like no one else. The press coverage alone paid for itself tenfold.", name: "Sofia Marin", role: "Head of Brand, Monastery" },
  { quote: "From strategy to execution, everything just hits. Vibify is our unfair advantage.", name: "Liam Walsh", role: "CEO, The Happy Yard" },
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
                <p className="text-textMuted">{testimonials[idx].role}</p>
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
