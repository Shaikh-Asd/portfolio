import { m } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import { fadeUp } from "@/lib/animations";
import { GlassCard } from "@/components/ui";
import { Section, AnimatedGrid } from "@/components/Section";

export function Testimonials() {
  return (
    <Section
      header={{
        label: "Testimonials",
        title: "What Clients Say",
        description: "Feedback from clients who have worked with me on various projects.",
      }}
    >
      <AnimatedGrid className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <m.div key={testimonial.client} variants={fadeUp}>
            <GlassCard className="flex h-full flex-col">
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* <div className="flex h-10 w-10 items-center justify-center rounded-full icon-box text-sm font-semibold text-accent">
                  {testimonial.client.charAt(testimonial.client.length - 1)}
                </div> */}
                <p className="text-sm font-medium text-foreground">
                  {testimonial.client}
                </p>
              </div>
            </GlassCard>
          </m.div>
        ))}
      </AnimatedGrid>
    </Section>
  );
}
