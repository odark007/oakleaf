"use client";

import { useState } from "react";

export function ContactPhone() {
  const [open, setOpen] = useState(false);

  return (
    <span className="relative inline-block">
      <a
        href="#"
        className="text-oak-green hover:underline"
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        0243521917
      </a>
      {open && (
        <span className="absolute left-0 top-full z-10 mt-2 w-44 rounded-lg border border-oak-line bg-white py-1 shadow-lg">
          <a
            href="tel:+233243521917"
            className="block px-4 py-2 text-sm text-oak-charcoal hover:bg-oak-surface-alt"
          >
            Call Now
          </a>
          <a
            href="https://wa.me/233243521917"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-sm text-oak-charcoal hover:bg-oak-surface-alt"
          >
            WhatsApp
          </a>
        </span>
      )}
    </span>
  );
}
