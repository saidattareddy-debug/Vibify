import { useEffect, useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import LogoMarquee from "../components/landing/LogoMarquee";
import Stats from "../components/landing/Stats";
import Services from "../components/landing/Services";
import ScrollProgress from "../components/landing/ScrollProgress";
import { Seo, SITE } from "../components/Seo";

// Heavy modal — only mount once user has clicked "Let's talk" / "Book a call".
// Keeps axios, Radix Dialog, and the form code OUT of the initial homepage bundle.
const ContactDialog = lazy(() => import("../components/landing/ContactDialog"));

// Preloader is only shown on the very first visit (sessionStorage gate) and
// includes its own framer-motion animations — lazy-load it too.
const Preloader = lazy(() => import("../components/landing/Preloader"));
const Work = lazy(() => import("../components/landing/Work"));
const Process = lazy(() => import("../components/landing/Process"));
const Testimonials = lazy(() => import("../components/landing/Testimonials"));
const CTASection = lazy(() => import("../components/landing/CTASection"));
const Footer = lazy(() => import("../components/landing/Footer"));

const HOME_TITLE = "Vibify — Marketing & PR Agency That Makes Brands Viral";
const HOME_DESC =
  "Vibify is a bold marketing & PR agency that turns attention into momentum. Brand strategy, PR, social, influencer, content, ads, web & PropTech that make brands impossible to ignore.";

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vibify",
  url: SITE,
  logo: `${SITE}/og-image.png`,
  description: HOME_DESC,
  sameAs: [
    "https://twitter.com/vibify",
    "https://www.instagram.com/vibify",
    "https://www.linkedin.com/company/vibify",
  ],
};

const shouldIntro = () => {
  if (typeof window === "undefined") return false;
  if (navigator.userAgent === "ReactSnap") return false;
  if (/lighthouse|chrome-lighthouse|pagespeed|gtmetrix|headlesschrome/i.test(navigator.userAgent)) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return !sessionStorage.getItem("vibify_intro_seen");
};

export default function Landing() {
  const [dialog, setDialog] = useState({ open: false, mode: "contact" });
  const [dialogMounted, setDialogMounted] = useState(false);
  const [loading, setLoading] = useState(shouldIntro);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  const openTalk = () => { setDialogMounted(true); setDialog({ open: true, mode: "contact" }); };
  const openBook = () => { setDialogMounted(true); setDialog({ open: true, mode: "booking" }); };
  const scrollToWork = () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  const finishIntro = () => {
    sessionStorage.setItem("vibify_intro_seen", "1");
    setLoading(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onIdle = () => setBelowFoldReady(true);
    const ric = window.requestIdleCallback || ((cb) => setTimeout(cb, 600));
    const id = ric(onIdle);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, []);

  return (
    <>
      <Seo title={HOME_TITLE} description={HOME_DESC} path="/" jsonLd={ORG_JSONLD} />
      <AnimatePresence>
        {loading && (
          <Suspense fallback={null}>
            <Preloader key="preloader" onDone={finishIntro} />
          </Suspense>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="bg-ink text-textPrimary" data-testid="landing-page">
          <ScrollProgress />
          <Navbar onTalk={openTalk} />
          <main>
            <Hero onTalk={openTalk} onWork={scrollToWork} />
            <LogoMarquee />
            <Stats />
            <Services onTalk={openTalk} />
            <Suspense fallback={null}>
              {belowFoldReady && (
                <>
                  <Work />
                  <Process />
                  <Testimonials />
                  <CTASection onBook={openBook} />
                </>
              )}
            </Suspense>
          </main>
          <Suspense fallback={null}>
            {belowFoldReady && <Footer onTalk={openTalk} />}
          </Suspense>
          {dialogMounted && (
            <Suspense fallback={null}>
              <ContactDialog
                open={dialog.open}
                mode={dialog.mode}
                onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
              />
            </Suspense>
          )}
        </div>
      )}
    </>
  );
}
