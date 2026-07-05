import { m } from "framer-motion";

const variants = {
  primary: "btn-gradient hover:brightness-110",
  secondary: "glass text-foreground hover:border-accent/30 hover:bg-accent/5",
  ghost: "text-muted hover:text-foreground",
};

export function Button({
  children,
  href,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
  target,
  rel,
  download,
}) {
  const styles = `relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-3 ${variants[variant]} ${className}`;
  const motionProps = disabled
    ? {}
    : {
        whileHover: { scale: 1.03, transition: { duration: 0.2 } },
        whileTap: { scale: 0.97 },
      };

  const shine = variant === "primary" && (
    <span
      className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"
      aria-hidden
    />
  );

  const content = (
    <>
      {shine}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <m.a
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={styles}
        {...motionProps}
      >
        {content}
      </m.a>
    );
  }

  return (
    <m.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
      {...motionProps}
    >
      {content}
    </m.button>
  );
}
