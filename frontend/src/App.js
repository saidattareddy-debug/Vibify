import "@/App.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { LazyMotion, domAnimation, AnimatePresence, m as motion } from "framer-motion";
import ScrollManager from "@/components/landing/ScrollManager";

// Landing stays eager so the homepage HTML/JS is the smallest possible critical chunk.
import Landing from "@/pages/Landing";

// Route-level code-splitting — every non-home page is fetched on-demand.
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const About = lazy(() => import("@/pages/About"));
const Admin = lazy(() => import("@/pages/Admin"));

// Toaster (sonner) is ~35KB — defer it until the page is idle so it never
// blocks first paint or LCP. By the time the user clicks a form CTA, the
// Toaster will already be mounted.
const Toaster = lazy(() =>
  import("@/components/ui/sonner").then((m) => ({ default: m.Toaster }))
);

const PageWrap = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Lightweight skeleton shown while a lazy chunk loads (matches dark midnight theme).
const RouteFallback = () => (
  <div aria-hidden className="min-h-[100vh] bg-ink" style={{ backgroundColor: "#0B0B12" }} />
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollManager />
      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrap><Landing /></PageWrap>} />
            <Route path="/services/:slug" element={<PageWrap><ServicePage /></PageWrap>} />
            <Route path="/about" element={<PageWrap><About /></PageWrap>} />
            <Route path="/admin" element={<PageWrap><Admin /></PageWrap>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </>
  );
}

// Idle-mount the Toaster so sonner is not pulled into the critical path.
function DeferredToaster() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const onIdle = () => setReady(true);
    if (typeof window !== "undefined") {
      const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
      const id = ric(onIdle);
      return () => {
        if (window.cancelIdleCallback) window.cancelIdleCallback(id);
        else clearTimeout(id);
      };
    }
  }, []);
  if (!ready) return null;
  return (
    <Suspense fallback={null}>
      <Toaster position="bottom-right" theme="dark" richColors />
    </Suspense>
  );
}

function App() {
  return (
    <div className="App">
      <LazyMotion features={domAnimation} strict={false}>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
        <DeferredToaster />
      </LazyMotion>
    </div>
  );
}

export default App;
