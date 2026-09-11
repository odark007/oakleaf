import { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-oak-line bg-oak-surface-alt">
      <div className="container-oak py-16 md:py-20">
        <div className="max-w-2xl">
          {eyebrow && (
            <p className="text-[0.85rem] font-medium text-oak-green">{eyebrow}</p>
          )}
          <h1 className="mt-3 text-[2.3rem] leading-[1.1] font-semibold tracking-tight text-oak-charcoal md:text-[2.9rem]">
            {title}
          </h1>
          {description && (
            <p className="mt-5 text-[1.05rem] leading-relaxed text-oak-charcoal/70">
              {description}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
