"use client";

import { useEffect, useRef, useState } from "react";

export function EnquireOptions({ sessionLabel }: { sessionLabel: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open ]);

  const whatsappHref = `https://wa.me/233243521917?text=${encodeURIComponent(
    `Hello Oakleaf, I'm interested in the Managing People Effectively ${sessionLabel}.`
  )}`;
  const emailHref = `mailto:training@oakleafafrica.com?subject=${encodeURIComponent(
    `Enquiry: Managing People Effectively - ${sessionLabel}`
  )}`;

  return (
    <span className="enquire-wrap" ref={ref}>
      <a
        href="#"
        className="btn btn-primary enquire"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={(e) => {
          e.preventDefault();
          setOpen((prev) => !prev);
        }}
      >
        Enquire <span>→</span>
      </a>
      {open && (
        <span className="enquire-menu">
          <a href="tel:+233243521917">
            <span>
              Phone call
              <small>0243 521 917</small>
            </span>
          </a>
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <span>
              WhatsApp
              <small>Chat with us instantly</small>
            </span>
          </a>
          <a href={emailHref}>
            <span>
              Email
              <small>training@oakleafafrica.com</small>
            </span>
          </a>
        </span>
      )}
    </span>
  );
}
