import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { programs } from "@/data/programs";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Become a Certified Trainer",
  description: programs.certifiedTrainer.summary,
  alternates: { canonical: "/programs/certified-trainer" },
};

const CheckCircle2 = getIcon("CheckCircle2");
const p = programs.certifiedTrainer;

export default function CertifiedTrainerPage() {
  return (
    <>
      <PageHero eyebrow={p.tagline} title={p.title} description={p.summary} />

      <section className="py-16 md:py-20">
        <div className="container-oak grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">
              Course Structure
            </h2>
            <div className="mt-6 space-y-5">
              {p.structure.map((item, i) => (
                <div key={item.title} className="flex gap-5 border-b border-oak-line pb-5 last:border-0">
                  <span className="text-[0.85rem] font-semibold text-oak-green">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.02rem] font-semibold text-oak-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[0.92rem] leading-relaxed text-oak-charcoal/65">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-8 lg:pl-6">
            <div>
              <h2 className="text-[0.85rem] font-medium uppercase tracking-wide text-oak-charcoal/40">
                Who it's for
              </h2>
              <ul className="mt-4 space-y-3">
                {p.audience.map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-[0.92rem] text-oak-charcoal/75">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-oak-green" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-oak-line bg-oak-surface-alt p-6">
              <h2 className="text-[0.95rem] font-semibold text-oak-charcoal">
                What you'll walk away with
              </h2>
              <ul className="mt-4 space-y-3">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-[0.88rem] text-oak-charcoal/70">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-oak-amber-dark" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaSection
        title="Ready to enroll?"
        description="Tell us about your background and goals, and we'll help you find the right cohort."
        primaryLabel="Request Enrollment Info"
      />
    </>
  );
}
