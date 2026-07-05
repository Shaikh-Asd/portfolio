import { m } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { staggerContainer, viewportOnce } from "@/lib/animations";

export function Section({ id, className = "", band = false, header, children }) {
  const section = (
    <section id={id} className={`section-padding ${className}`}>
      <div className="container-main">
        {header && <SectionHeader {...header} />}
        {children}
      </div>
    </section>
  );

  return band ? <div className="section-band">{section}</div> : section;
}

export function AnimatedGrid({ children, className = "" }) {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {children}
    </m.div>
  );
}
