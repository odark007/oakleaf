import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { StepTimeline } from "@/components/sections/step-timeline";
import { CtaSection } from "@/components/sections/cta-section";
import { approachSteps } from "@/data/approach-steps";
import { approachPages } from "@/data/approach-pages";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "From diagnosis to learning, application, behavior change, and organizational impact — Oakleaf's seven-stage approach to training and consulting.",
  alternates: { canonical: "/approach" },
};

const ArrowUpRight = getIcon("ArrowUpRight");

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        title="From learning to lasting impact"
        description="At Oakleaf, we believe training should not end when participants leave the training room. Our approach focuses on the full journey from diagnosis to learning, application, behavior change, and organizational impact."
      />

      <section className="py-16 md:py-20">
        <div className="container-oak max-w-2xl">
          <StepTimeline steps={approachSteps} />
        </div>
      </section>

      <section className="border-t border-oak-line bg-oak-surface-alt py-16 md:py-20">
        <div className="container-oak">
          <h2 className="text-[1.6rem] font-semibold text-oak-charcoal">
            More on how we work
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {approachPages.map((page) => (
              <Link
                key={page.slug}
                href={`/approach/${page.slug}`}
                className="group flex flex-col justify-between border border-oak-line bg-white p-6"
              >
                <div>
                  <h3 className="text-[1.05rem] font-semibold text-oak-charcoal">
                    {page.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-oak-charcoal/65">
                    {page.tagline}
                  </p>
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-oak-green">
                  Read more
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
