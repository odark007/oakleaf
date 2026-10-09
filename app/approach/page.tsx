import type { Metadata } from "next";
import Image from "next/image";
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
        <div className="container-oak grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <div className="max-w-2xl">
            <StepTimeline steps={approachSteps} />
          </div>
          <div className="relative hidden lg:block">
            <Image
              src="/images/Abstract S-Curve Process Roadmap.jpg"
              alt="Abstract S-Curve Process Roadmap"
              width={600}
              height={450}
              className="rounded-2xl border border-oak-line object-cover shadow-sm"
            />
          </div>
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
