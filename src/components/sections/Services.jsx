import { m } from "framer-motion";
import { services } from "@/lib/data";
import { serviceIcons } from "@/lib/icons";
import { fadeUp } from "@/lib/animations";
import { GlassCard } from "@/components/ui";
import { Section, AnimatedGrid } from "@/components/Section";

export function Services() {
  return (
    <Section
      id="services"
      band
      header={{
        label: "Services",
        title: "What I Can Build For You",
        description:
          "End-to-end development services tailored to help your business grow with modern, scalable technology.",
      }}
    >
      <AnimatedGrid className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {services.map((service) => {
          const Icon = serviceIcons[service.icon];
          return (
            <m.div key={service.title} variants={fadeUp}>
              <GlassCard className="group h-full">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl icon-box transition-colors group-hover:opacity-90">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{service.description}</p>
              </GlassCard>
            </m.div>
          );
        })}
      </AnimatedGrid>
    </Section>
  );
}
