import { m } from "framer-motion";
import { useRef, useState } from "react";
import { smoothEase } from "@/lib/animations";

export function GlassCard({
  children,
  className = "",
  hover = true,
  spotlight = true,
  ...props
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current || !spotlight) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <m.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        hover
          ? { y: -6, transition: { duration: 0.25, ease: smoothEase } }
          : undefined
      }
      className={`group relative overflow-hidden rounded-2xl p-4 transition-[box-shadow,border-color] duration-300 sm:p-6 ${
        hover ? "hover:[box-shadow:var(--shadow-card-hover)]" : ""
      } ${className}`}
      {...props}
    >
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: isHovered
              ? `radial-gradient(360px circle at ${position.x}px ${position.y}px, var(--spotlight-core), transparent 42%), radial-gradient(480px circle at ${position.x}px ${position.y}px, var(--spotlight), transparent 68%)`
              : undefined,
          }}
        />
      )}
      <div className="glass absolute inset-0 rounded-2xl" />
      <div className="relative z-10">{children}</div>
    </m.div>
  );
}
