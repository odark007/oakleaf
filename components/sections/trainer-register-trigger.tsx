"use client";

import { useState } from "react";
import { TrainerRegisterModal } from "./trainer-register-modal";

export function TrainerRegisterTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className="inline-flex items-center justify-center rounded-full bg-oak-green px-6 py-2.5 text-sm font-medium text-white transition hover:bg-oak-green/90"
      >
        Register
      </a>
      <TrainerRegisterModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
