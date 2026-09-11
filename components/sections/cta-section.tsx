import { LinkButton } from "@/components/ui/button";

export function CtaSection({
  title = "Need a training or consulting solution?",
  description = "Let's have a conversation about your organization's needs.",
  primaryLabel = "Contact Us",
  primaryHref = "/contact",
  secondaryLabel = "Request a Consultation",
  secondaryHref = "/contact",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="bg-oak-green-deep">
      <div className="container-oak py-16 md:py-20">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <h2 className="text-[1.9rem] font-semibold leading-tight text-white md:text-[2.2rem]">
              {title}
            </h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-white/70">
              {description}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <LinkButton href={primaryHref} variant="secondary" className="rounded-sm">
              {primaryLabel}
            </LinkButton>
            <LinkButton
              href={secondaryHref}
              variant="outline"
              className="rounded-sm border-white/30 text-white hover:border-white hover:text-oak-amber"
            >
              {secondaryLabel}
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
