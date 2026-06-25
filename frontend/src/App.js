import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import ServicePage from "@/pages/ServicePage";
import Admin from "@/pages/Admin";
import ScrollManager from "@/components/landing/ScrollManager";

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

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollManager />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrap><Landing /></PageWrap>} />
          <Route path="/services/:slug" element={<PageWrap><ServicePage /></PageWrap>} />
          <Route path="/admin" element={<PageWrap><Admin /></PageWrap>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <Toaster position="bottom-right" theme="dark" richColors />
    </div>
  );
}

export default App;
