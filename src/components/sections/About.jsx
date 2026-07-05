import { m } from "framer-motion";
import { aboutContent, personalInfo } from "@/lib/data";
import { slideInLeft, slideInRight, staggerContainer, viewportOnce } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui";
import { Section } from "@/components/Section";

export function About() {
  return (
    <Section
      id="about"
      header={{
        label: "About Me",
        title: "Crafting Digital Solutions That Scale",
        description: personalInfo.tagline,
      }}
    >
      <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
        <m.div
          variants={slideInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative"
        >
          <m.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass gradient-border relative overflow-hidden rounded-2xl p-5 sm:p-8"
          >
            <m.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl"
            />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-xl font-bold text-white sm:h-16 sm:w-16 sm:text-2xl">
                  AS
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground sm:text-xl">
                    {personalInfo.name}
                  </p>
                  <p className="text-sm text-muted">{personalInfo.title}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="stat-pill rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold gradient-text">
                    <AnimatedCounter value={6} suffix="+" />
                  </p>
                  <p className="text-xs text-muted">Years Experience</p>
                </div>
                <div className="stat-pill rounded-xl p-3 text-center">
                  <p className="text-2xl font-bold gradient-text">
                    <AnimatedCounter value={50} suffix="+" />
                  </p>
                  <p className="text-xs text-muted">Projects Done</p>
                </div>
              </div>
            </div>
          </m.div>
        </m.div>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="space-y-4"
        >
          {aboutContent.map((paragraph, i) => (
            <m.p
              key={i}
              variants={slideInRight}
              transition={{ delay: i * 0.08 }}
              className="text-base leading-relaxed text-muted sm:text-lg"
            >
              {paragraph}
            </m.p>
          ))}
        </m.div>
      </div>
    </Section>
  );
}
