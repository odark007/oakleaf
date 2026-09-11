import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { digitalTransformation } from "@/data/digital-transformation";
import { getIcon } from "@/lib/icons";

const c = digitalTransformation.consulting;
const CheckCircle2 = getIcon("CheckCircle2");

export const metadata: Metadata = {
  title: c.title,
  description: c.summary,
  alternates: { canonical: "/digital-transformation/consulting" },
};

export default function DigitalConsultingPage() {
  return (
    <>
      <PageHero eyebrow={c.tagline} title={c.title} description={c.summary} />
      <section className="py-16 md:py-20">
        <div className="container-oak max-w-2xl">
          <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">Advisory Areas</h2>
          <ul className="mt-6 space-y-3.5">
            {c.areas.map((a) => (
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
