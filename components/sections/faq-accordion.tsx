"use client";

import { useState } from "react";
import { getIcon } from "@/lib/icons";

const ChevronDown = getIcon("ChevronDown");

export function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-oak-line border-y border-oak-line">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;
        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="text-[1rem] font-medium text-oak-charcoal">
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-oak-green transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 pr-8 text-[0.95rem] leading-relaxed text-oak-charcoal/70"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
