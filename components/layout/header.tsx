"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { mainNav } from "@/data/site";
import { getIcon } from "@/lib/icons";
import { LinkButton } from "@/components/ui/button";

const Menu = getIcon("Menu");
const X = getIcon("X");
const ChevronDown = getIcon("ChevronDown");

export function Header() {
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDesktop(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenDesktop(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-oak-line">
      <div className="container-oak flex h-[76px] items-center justify-between">
        <Link href="/" className="flex items-center shrink-0" aria-label="Oakleaf Training & Consulting home">
          <Image
            src="/oakleaf-logo-navbar-280x100.png"
            alt="Oakleaf Training & Consulting"
            width={140}
            height={50}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <nav ref={navRef} className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {mainNav.map((item) => (
            <div key={item.href} className="relative">
              {item.children ? (
                <button
                  className="flex items-center gap-1 px-3.5 py-2 text-[0.92rem] font-medium text-oak-charcoal/85 hover:text-oak-green rounded-md"
                  aria-expanded={openDesktop === item.label}
                  aria-haspopup="true"
                  onClick={() =>
                    setOpenDesktop(openDesktop === item.label ? null : item.label)
                  }
                >
                  {item.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${openDesktop === item.label ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="px-3.5 py-2 text-[0.92rem] font-medium text-oak-charcoal/85 hover:text-oak-green rounded-md inline-block"
                >
                  {item.label}
                </Link>
              )}

              {item.children && openDesktop === item.label && (
                <div className="absolute left-0 top-full mt-1 w-80 rounded-md border border-oak-line bg-white py-2 shadow-lg shadow-black/5">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2.5 text-[0.88rem] text-oak-charcoal/85 hover:bg-oak-surface-alt hover:text-oak-green"
                      onClick={() => setOpenDesktop(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href="/contact" variant="primary" className="rounded-sm">
            Talk to Us
          </LinkButton>
        </div>

        <button
          className="lg:hidden grid h-10 w-10 place-items-center text-oak-charcoal"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-oak-line bg-white max-h-[calc(100vh-76px)] overflow-y-auto">
          <div className="container-oak py-3">
            {mainNav.map((item) => (
              <div key={item.href} className="border-b border-oak-line last:border-0">
                {item.children ? (
                  <>
                    <button
                      className="flex w-full items-center justify-between py-3.5 text-left text-[0.95rem] font-medium text-oak-charcoal"
                      aria-expanded={mobileSection === item.label}
                      onClick={() =>
                        setMobileSection(mobileSection === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {mobileSection === item.label && (
                      <div className="pb-3 pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-[0.88rem] text-oak-charcoal/75"
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-3.5 text-[0.95rem] font-medium text-oak-charcoal"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4">
              <LinkButton href="/contact" variant="primary" className="w-full justify-center rounded-sm">
                Talk to Us
              </LinkButton>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
