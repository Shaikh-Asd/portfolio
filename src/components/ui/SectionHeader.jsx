import { m } from "framer-motion";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/animations";

export function SectionHeader({ label, title, description, align = "center" }) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mb-8 max-w-2xl sm:mb-12 ${alignClass}`}
    >
      <m.span
        variants={fadeUp}
        className="mb-3 inline-block section-badge rounded-full px-3 py-1 text-xs font-medium tracking-wider uppercase"
      >
        {label}
      </m.span>
      <m.h2
        variants={fadeUp}
        className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
      >
        {title}
      </m.h2>
      {description && (
        <m.p
          variants={fadeUp}
          className="mt-3 text-sm leading-relaxed text-muted sm:mt-4 sm:text-base md:text-lg"
        >
          {description}
        </m.p>
      )}
    </m.div>
  );
}
