import { useState, useEffect } from "react";
import { m, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, personalInfo } from "@/lib/data";
import { fadeUp, smoothEase, staggerFast } from "@/lib/animations";
import { ScrollProgress } from "@/components/ui";
import { ThemeToggle } from "./ThemeToggle";

function NavLink({ href, label, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative text-sm text-muted transition-colors hover:text-foreground"
    >
      {label}
      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-300 group-hover:w-full" />
    </a>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const resumeUrl = encodeURI(personalInfo.resume.path);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <ScrollProgress />
      <m.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: smoothEase }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? "navbar-scrolled py-3" : "bg-transparent py-4 sm:py-5"
        }`}
      >
        <nav
          className="container-main flex items-center justify-between"
          aria-label="Main navigation"
        >
          <m.a
            href="#"
            whileHover={{ scale: 1.02 }}
            className="text-base font-semibold tracking-tight text-foreground sm:text-lg"
          >
            {personalInfo.name.split(" ")[0]} {personalInfo.name.split(" ")[1]}
            
            {/* <span className="gradient-text">.</span> */}
          </m.a>

          <div className="hidden items-center gap-6 lg:gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
            <ThemeToggle />
            <m.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="glass rounded-full px-5 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/30"
            >
              Resume
            </m.a>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <ThemeToggle />
            <m.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsOpen(!isOpen)}
              className="glass flex h-9 w-9 items-center justify-center rounded-full text-foreground"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <AnimatePresence mode="wait">
                <m.span
                  key={isOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </m.span>
              </AnimatePresence>
            </m.button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <>
              <m.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 top-[57px] z-40 bg-background/80 backdrop-blur-sm lg:hidden"
                onClick={() => setIsOpen(false)}
                aria-hidden
              />
              <m.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="glass relative z-50 max-h-[calc(100dvh-57px)] overflow-y-auto border-t border-card-border lg:hidden"
              >
                <m.div
                  variants={staggerFast}
                  initial="hidden"
                  animate="visible"
                  className="container-main flex flex-col gap-1 py-4"
                >
                  {navLinks.map((link) => (
                    <m.a
                      key={link.href}
                      variants={fadeUp}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-accent/5 hover:text-foreground"
                    >
                      {link.label}
                    </m.a>
                  ))}
                  <m.a
                    variants={fadeUp}
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-3 py-3 text-base text-muted transition-colors hover:bg-accent/5 hover:text-foreground"
                  >
                    Resume
                  </m.a>
                </m.div>
              </m.div>
            </>
          )}
        </AnimatePresence>
      </m.header>
    </>
  );
}
