import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroStats, personalInfo, techIcons } from "@/lib/data";
import { heroStatIcons } from "@/lib/icons";
import { fadeUp, smoothEase, staggerContainer } from "@/lib/animations";
import { Button, ScrollIndicator } from "@/components/ui";

function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="grid-pattern absolute inset-0" />
      <div className="hero-particles absolute inset-0" />
      <div className="hero-blob hero-blob-1 absolute -top-1/4 -left-1/4 h-[280px] w-[280px] rounded-full bg-indigo-400/20 blur-[80px] sm:h-[400px] sm:w-[400px] md:h-[600px] md:w-[600px] dark:bg-accent/15" />
      <div className="hero-blob hero-blob-2 absolute -right-1/4 -bottom-1/4 h-[240px] w-[240px] rounded-full bg-violet-400/18 blur-[80px] sm:h-[350px] sm:w-[350px] md:h-[500px] md:w-[500px] dark:bg-accent-secondary/15" />
      <div className="hero-blob hero-blob-3 absolute top-1/3 left-1/2 h-[180px] w-[180px] -translate-x-1/2 rounded-full bg-indigo-300/15 blur-[60px] sm:h-[240px] sm:w-[240px] md:h-[300px] md:w-[300px] dark:bg-accent/10" />
    </div>
  );
}

function TechMarquee() {
  const items = [...techIcons, ...techIcons];

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.6 }}
      className="relative -mx-4 mt-10 overflow-hidden sm:mt-16 sm:mx-0"
    >
      <div className="absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent sm:w-16" />
      <div className="absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent sm:w-16" />
      <div className="animate-marquee flex w-max gap-3 sm:gap-4">
        {items.map((tech, i) => (
          <div
            key={`${tech}-${i}`}
            className="glass flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium text-muted whitespace-nowrap transition-transform hover:scale-105 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 sm:h-2 sm:w-2" />
            {tech}
          </div>
        ))}
      </div>
    </m.div>
  );
}

const headlineLines = [
  { text: "Full Stack", gradient: true },
  { text: "Software Developer", gradient: false },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-20 pb-12 sm:pt-24 sm:pb-16">
      <HeroBackground />

      <div className="container-main relative z-10 w-full">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <m.p
              variants={fadeUp}
              className="mb-3 text-xs font-medium tracking-widest text-muted uppercase sm:mb-4 sm:text-sm"
            >
              {personalInfo.name}
            </m.p>

            <h1 className="text-[1.75rem] leading-[1.15] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              {headlineLines.map((line, i) => (
                <m.span
                  key={line.text}
                  initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ delay: 0.25 + i * 0.15, duration: 0.8, ease: smoothEase }}
                  className={`block ${line.gradient ? "gradient-text animate-gradient-shift" : ""}`}
                >
                  {line.text}
                </m.span>
              ))}
            </h1>

            <m.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg lg:mx-0 lg:max-w-xl"
            >
              I design and develop modern web applications, mobile apps, APIs, and
              cloud-based software solutions for startups, businesses, and entrepreneurs.
            </m.p>

            <m.div
              variants={fadeUp}
              className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4 lg:justify-start"
            >
              <Button href="#contact" className="w-auto">
                Hire Me
                <ArrowRight className="h-4 w-4 animate-nudge" />
              </Button>
              <Button href="#projects" variant="secondary" className="w-auto">
                View Projects
              </Button>
            </m.div>
          </m.div>

          <m.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mx-auto w-full max-w-md lg:max-w-none"
          >
            <m.div
              variants={fadeUp}
              className="glass gradient-border relative overflow-hidden rounded-2xl p-4 sm:p-6"
            >
              <m.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"
              />
              <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
                {heroStats.map((stat) => {
                  const Icon = heroStatIcons[stat.icon];
                  return (
                    <m.div
                      key={stat.label}
                      variants={fadeUp}
                      className="glass rounded-xl p-3 text-center transition-transform hover:-translate-y-1 sm:p-4"
                    >
                      <Icon className="mx-auto mb-1.5 h-4 w-4 text-accent sm:mb-2 sm:h-5 sm:w-5" />
                      <p className="text-[11px] leading-snug font-medium text-muted sm:text-sm">
                        {stat.label}
                      </p>
                    </m.div>
                  );
                })}
              </div>
            </m.div>
          </m.div>
        </div>

        <TechMarquee />
      </div>

      <ScrollIndicator />
    </section>
  );
}
