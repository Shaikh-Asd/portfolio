import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD = 400;

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="glass fixed right-4 bottom-6 z-40 flex h-11 w-11 items-center justify-center rounded-full text-foreground shadow-lg transition-colors hover:border-accent/30 sm:right-6 sm:bottom-8"
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </m.button>
      )}
    </AnimatePresence>
  );
}
