import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { digitalTransformation } from "@/data/digital-transformation";
import { getIcon } from "@/lib/icons";

const t = digitalTransformation.training;
const CheckCircle2 = getIcon("CheckCircle2");

export const metadata: Metadata = {
  title: t.title,
  description: t.summary,
  alternates: { canonical: "/digital-transformation/training" },
};

export default function DigitalTrainingPage() {
  return (
    <>
      <PageHero eyebrow={t.tagline} title={t.title} description={t.summary} />
      <section className="py-16 md:py-20">
        <div className="container-oak max-w-2xl">
          <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">Training Areas</h2>
          <ul className="mt-6 space-y-3.5">
            {t.areas.map((a) => (
              <li key={a} className="flex items-start gap-2.5 text-[0.96rem] text-oak-charcoal/75">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-oak-green" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
