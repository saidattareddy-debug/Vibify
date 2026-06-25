import { useState } from "react";
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
import ContactDialog from "../components/landing/ContactDialog";

export default function Landing() {
  const [dialog, setDialog] = useState({ open: false, mode: "contact" });

  const openTalk = () => setDialog({ open: true, mode: "contact" });
  const openBook = () => setDialog({ open: true, mode: "booking" });
  const scrollToWork = () => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });

  return (
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
      <ContactDialog
        open={dialog.open}
        mode={dialog.mode}
        onOpenChange={(open) => setDialog((d) => ({ ...d, open }))}
      />
    </div>
  );
}
