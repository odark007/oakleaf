import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { programs } from "@/data/programs";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Management and Leadership Development Program (MLDP)",
  description: programs.mldp.summary,
  alternates: { canonical: "/programs/mldp" },
};

const CheckCircle2 = getIcon("CheckCircle2");
const m = programs.mldp;

export default function MldpPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Collaborative Business Workshop in a Bright Office.png')" }}
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative">
      <PageHero eyebrow={m.tagline} title={m.title} description={m.summary} transparent />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-oak">
          <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">Leadership Tiers</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {m.tiers.map((tier) => (
              <div key={tier.title} className="border-l-2 border-oak-amber bg-oak-surface-alt p-6">
                <h3 className="text-[1.02rem] font-semibold text-oak-charcoal">{tier.title}</h3>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-oak-charcoal/65">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-oak-line py-16 md:py-20">
        <div className="container-oak grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">Program Modules</h2>
            <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {m.modules.map((mod) => (
                <li key={mod} className="flex items-start gap-2.5 text-[0.94rem] text-oak-charcoal/75">
                  <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-oak-green" />
                  {mod}
                </li>
              ))}
            </ul>
          </div>

          <aside className="border border-oak-line bg-oak-surface-alt p-7 lg:self-start">
            <h2 className="text-[0.95rem] font-semibold text-oak-charcoal">Outcomes</h2>
            <ul className="mt-4 space-y-3">
              {m.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-[0.88rem] text-oak-charcoal/70">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-oak-amber-dark" />
                  {o}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaSection
        title="Bring MLDP to your organization"
        description="Tell us about your leadership tiers and goals, and we'll propose a program structure."
      />
    </>
  );
}
