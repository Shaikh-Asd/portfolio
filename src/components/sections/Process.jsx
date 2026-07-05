import { useCallback, useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { processSteps } from "@/lib/data";
import { smoothEase, viewportOnce } from "@/lib/animations";
import { Section } from "@/components/Section";

const STEP_DURATION = 2000;

function StepContent({ index }) {
  const step = processSteps[index];

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-3 flex items-center gap-3">
        <m.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.05 }}
          className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent"
        >
          Step {step.step}
        </m.span>
        <m.div
          initial={{ width: 0 }}
          animate={{ width: 32 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="h-px bg-gradient-to-r from-indigo-500 to-violet-500"
        />
      </div>

      <m.h3
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="mb-2 text-xl font-semibold text-foreground sm:text-2xl"
      >
        {step.title}
      </m.h3>

      <m.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.35 }}
        className="text-sm leading-relaxed text-muted sm:text-base"
      >
        {step.description}
      </m.p>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="mt-5 flex items-center justify-between border-t border-card-border pt-4"
      >
        <div className="flex gap-1.5">
          {processSteps.map((_, i) => (
            <m.div
              key={i}
              animate={{
                width: i === index ? 24 : 6,
                backgroundColor:
                  i <= index
                    ? "rgba(99,102,241,0.8)"
                    : "rgba(99,102,241,0.15)",
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
            />
          ))}
        </div>
        <span className="text-xs text-muted sm:text-sm">
          {index + 1} / {processSteps.length}
        </span>
      </m.div>
    </div>
  );
}

export function Process() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((index) => {
    setActive(index);
  }, []);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % processSteps.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, STEP_DURATION);
    return () => clearInterval(timer);
  }, [paused, next, active]);

  const progressPercent = (active / (processSteps.length - 1)) * 100;

  return (
    <Section
      id="process"
      band
      header={{
        label: "Development Process",
        title: "How We Work Together",
        description:
          "A structured, transparent approach from initial discussion to production deployment.",
      }}
    >
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: smoothEase }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mx-auto max-w-3xl"
        >
          {/* Desktop / tablet stepper */}
          <div className="hidden sm:block">
            <div className="relative mb-10">
              <div className="absolute top-5 right-5 left-5 h-0.5 bg-accent/10" />
              <m.div
                className="absolute top-5 left-5 h-0.5 origin-left bg-gradient-to-r from-indigo-500 to-violet-500"
                animate={{ width: `calc((100% - 2.5rem) * ${progressPercent / 100})` }}
                transition={{ duration: 0.6, ease: smoothEase }}
              />

              <div className="relative flex justify-between">
                {processSteps.map((step, i) => {
                  const isActive = i === active;
                  const isDone = i < active;

                  return (
                    <button
                      key={step.step}
                      onClick={() => goTo(i)}
                      className="group flex flex-col items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                      aria-label={`Step ${step.step}: ${step.title}`}
                      aria-current={isActive ? "step" : undefined}
                    >
                      <m.div
                        animate={{
                          scale: isActive ? 1.12 : 1,
                          boxShadow: isActive
                            ? "0 0 0 4px rgba(99,102,241,0.2), 0 8px 24px rgba(99,102,241,0.25)"
                            : "0 0 0 0px transparent",
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                          isActive || isDone
                            ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                            : "glass text-muted group-hover:text-foreground"
                        }`}
                      >
                        {step.step}
                        {isActive && (
                          <m.svg
                            className="absolute inset-0 h-full w-full -rotate-90"
                            viewBox="0 0 40 40"
                          >
                            <m.circle
                              cx="20"
                              cy="20"
                              r="18"
                              fill="none"
                              stroke="rgba(255,255,255,0.45)"
                              strokeWidth="2"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: paused ? undefined : 1 }}
                              transition={{
                                duration: STEP_DURATION / 1000,
                                ease: "linear",
                              }}
                            />
                          </m.svg>
                        )}
                      </m.div>
                      <span
                        className={`max-w-[72px] text-center text-xs font-medium leading-tight transition-colors ${
                          isActive ? "text-foreground" : "text-muted"
                        }`}
                      >
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative min-h-[150px]">
              <AnimatePresence mode="wait">
                <m.div
                  key={active}
                  initial={{ opacity: 0, y: 30, scaleY: 0.85 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  exit={{ opacity: 0, y: -20, scaleY: 0.9 }}
                  transition={{ duration: 0.45, ease: smoothEase }}
                  style={{ transformOrigin: "top center" }}
                  className="glass overflow-hidden rounded-2xl"
                >
                  <StepContent index={active} />
                </m.div>
              </AnimatePresence>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={next}
                className="flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-foreground"
              >
                {active < processSteps.length - 1 ? "Next step" : "Start over"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile vertical opening steps */}
          <div className="space-y-3 sm:hidden">
            {processSteps.map((step, i) => {
              const isActive = i === active;
              const isDone = i < active;

              return (
                <m.div
                  key={step.step}
                  layout
                  transition={{ layout: { duration: 0.35, ease: smoothEase } }}
                  className={`overflow-hidden rounded-xl border transition-colors ${
                    isActive
                      ? "border-accent/30 bg-accent/[0.03]"
                      : "border-card-border glass"
                  }`}
                >
                  <button
                    onClick={() => goTo(i)}
                    className="flex w-full items-center gap-3 p-3.5 text-left"
                  >
                    <m.div
                      animate={{ scale: isActive ? 1.1 : 1 }}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isActive || isDone
                          ? "bg-gradient-to-br from-indigo-500 to-violet-500 text-white"
                          : "bg-accent/10 text-muted"
                      }`}
                    >
                      {step.step}
                    </m.div>
                    <p
                      className={`flex-1 text-sm font-medium ${
                        isActive ? "text-foreground" : "text-muted"
                      }`}
                    >
                      {step.title}
                    </p>
                    <m.div
                      animate={{ rotate: isActive ? 90 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronRight className="h-4 w-4 text-muted" />
                    </m.div>
                  </button>

                  <AnimatePresence>
                    {isActive && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: smoothEase }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-card-border px-3.5 pt-3 pb-4 text-sm leading-relaxed text-muted">
                          {step.description}
                        </p>
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              );
            })}
          </div>
        </m.div>
    </Section>
  );
}
