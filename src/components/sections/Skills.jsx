import { m, useInView } from "framer-motion";
import { useRef } from "react";
import { skillCategories } from "@/lib/data";
import { fadeUp, smoothEase } from "@/lib/animations";
import { AnimatedCounter } from "@/components/ui";
import { Section, AnimatedGrid } from "@/components/Section";

function SkillBar({ name, level, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted">
          {isInView ? (
            <AnimatedCounter value={level} suffix="%" duration={1.2} />
          ) : (
            "0%"
          )}
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-accent/10">
        <m.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: smoothEase }}
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      header={{
        label: "Skills",
        title: "Technologies I Work With",
        description:
          "A comprehensive toolkit spanning frontend, backend, mobile, databases, and DevOps.",
      }}
    >
      <AnimatedGrid className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, catIndex) => (
          <m.div
            key={category.category}
            variants={fadeUp}
            className="glass rounded-2xl p-4 transition-transform hover:-translate-y-1 sm:p-6"
          >
            <h3 className="mb-6 text-lg font-semibold text-foreground">
              {category.category}
            </h3>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={catIndex * 0.08 + skillIndex * 0.05}
                />
              ))}
            </div>
          </m.div>
        ))}
      </AnimatedGrid>
    </Section>
  );
}
