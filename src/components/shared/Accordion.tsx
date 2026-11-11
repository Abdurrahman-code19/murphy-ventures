import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "../../lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number | null;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <div className="border-y border-line">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question} className="border-b border-line last:border-b-0">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span
                  className={cn(
                    "font-display text-[15.5px] font-semibold leading-snug transition-colors sm:text-[17px]",
                    isOpen ? "text-royal" : "text-navy group-hover:text-royal",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors",
                    isOpen
                      ? "border-gold bg-gold text-navy"
                      : "border-line-dark text-navy group-hover:border-gold",
                  )}
                >
                  {isOpen ? (
                    <Minus className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                </span>
              </button>
            </h3>

            {reduceMotion ? (
              isOpen ? (
                <div id={panelId} role="region" aria-labelledby={triggerId}>
                  <p className="pb-6 pr-10 text-[14.5px] leading-relaxed text-muted">
                    {item.answer}
                  </p>
                </div>
              ) : null
            ) : (
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 text-[14.5px] leading-relaxed text-muted">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </div>
  );
}
