import { useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/data";
import { Section } from "@/components/Section";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section
      header={{
        label: "FAQ",
        title: "Frequently Asked Questions",
        description: "Common questions about my services and how I work with clients.",
      }}
    >
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.question} className="glass overflow-hidden rounded-xl">
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-medium text-foreground sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="border-t border-card-border px-5 py-4 text-sm text-muted">
                      {faq.answer}
                    </p>
                  </m.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
