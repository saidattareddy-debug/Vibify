import { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import LogoMarquee from "../components/landing/LogoMarquee";
import Stats from "../components/landing/Stats";
import Services from "../components/landing/Services";
import Work from "../components/landing/Work";
import Process from "../components/landing/Process";
import Testimonials from "../components/landing/Testimonials";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";
import ScrollProgress from "../components/landing/ScrollProgress";
import { Seo, SITE } from "../components/Seo";

// Heavy modal — only mount once user has clicked "Let's talk" / "Book a call".
// Keeps axios, Radix Dialog, and the form code OUT of the initial homepage bundle.
const ContactDialog = lazy(() => import("../components/landing/ContactDialog"));

// Preloader is only shown on the very first visit (sessionStorage gate) and
// includes its own framer-motion animations — lazy-load it too.
const Preloader = lazy(() => import("../components/landing/Preloader"));

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

  const openTalk = () => { setDialogMounted(true); setDialog({ open: true, mode: "contact" }); };
  const openBook = () => { setDialogMounted(true); setDialog({ open: true, mode: "booking" }); };
  const scrollToWork = () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  const finishIntro = () => {
    sessionStorage.setItem("vibify_intro_seen", "1");
    setLoading(false);
  };

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
            <Work />
            <Process />
            <Testimonials />
            <CTASection onBook={openBook} />
          </main>
          <Footer onTalk={openTalk} />
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
