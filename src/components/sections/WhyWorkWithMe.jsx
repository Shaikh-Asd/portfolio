import { m } from "framer-motion";
import { whyWorkWithMe } from "@/lib/data";
import { whyWorkIcons } from "@/lib/icons";
import { fadeUp } from "@/lib/animations";
import { GlassCard } from "@/components/ui";
import { Section, AnimatedGrid } from "@/components/Section";

export function WhyWorkWithMe() {
  return (
    <Section
      header={{
        label: "Why Work With Me",
        title: "Your Trusted Development Partner",
        description:
          "I bring a combination of technical expertise, clear communication, and a commitment to delivering exceptional results.",
      }}
    >
      <AnimatedGrid className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {whyWorkWithMe.map((item) => {
          const Icon = whyWorkIcons[item.icon];
          return (
            <m.div key={item.title} variants={fadeUp}>
              <GlassCard className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg icon-box sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                </div>
                <p className="text-xs font-medium text-foreground sm:text-sm">
                  {item.title}
                </p>
              </GlassCard>
            </m.div>
          );
        })}
      </AnimatedGrid>
    </Section>
  );
}
