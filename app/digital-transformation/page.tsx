import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { digitalTransformation } from "@/data/digital-transformation";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Digital Transformation",
  description:
    "Practical support to help organizations build digital capability among their people and integrate technology into how they work.",
  alternates: { canonical: "/digital-transformation" },
};

const Laptop = getIcon("Laptop");
const Layers = getIcon("Layers");
const ArrowUpRight = getIcon("ArrowUpRight");
const CheckCircle2 = getIcon("CheckCircle2");

export default function DigitalTransformationPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Collaborative Teamwork in a Modern Office.png')" }}
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative">
      <PageHero
        eyebrow="Digital Transformation"
        title="Building digital capability, practically"
        description={digitalTransformation.overview.summary}
        transparent
      />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-oak">
          <div className="grid gap-4 sm:grid-cols-3">
            {digitalTransformation.overview.pillars.map((pillar) => (
              <div key={pillar.title} className="border border-oak-line bg-oak-surface-alt p-6">
                <h2 className="text-[1.02rem] font-semibold text-oak-charcoal">{pillar.title}</h2>
                <p className="mt-2.5 text-[0.9rem] leading-relaxed text-oak-charcoal/65">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-oak-line py-16 md:py-20">
        <div className="container-oak grid gap-6 md:grid-cols-2">
          <a
            href="#digital-training"
            className="group flex flex-col justify-between border-l-2 border-oak-green bg-white p-8"
          >
            <div>
              <Laptop size={28} strokeWidth={1.6} className="text-oak-green" />
              <h2 className="mt-4 text-[1.25rem] font-semibold text-oak-charcoal">
                {digitalTransformation.training.title}
              </h2>
              <p className="mt-2.5 text-[0.94rem] leading-relaxed text-oak-charcoal/65">
                {digitalTransformation.training.tagline}
              </p>
            </div>
            <span className="mt-7 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-oak-green">
              Learn more
              <ArrowUpRight size={15} />
            </span>
          </a>

          <a
            href="#digital-consulting"
            className="group flex flex-col justify-between border-l-2 border-oak-amber bg-white p-8"
          >
            <div>
              <Layers size={28} strokeWidth={1.6} className="text-oak-amber-dark" />
              <h2 className="mt-4 text-[1.25rem] font-semibold text-oak-charcoal">
                {digitalTransformation.consulting.title}
              </h2>
              <p className="mt-2.5 text-[0.94rem] leading-relaxed text-oak-charcoal/65">
                {digitalTransformation.consulting.tagline}
              </p>
            </div>
            <span className="mt-7 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-oak-amber-dark">
              Learn more
              <ArrowUpRight size={15} />
            </span>
          </a>
        </div>
      </section>

      <section id="digital-training" className="scroll-mt-24 border-t border-oak-line py-16 md:py-20">
        <div className="container-oak max-w-2xl">
          <p className="text-[0.85rem] font-medium text-oak-green">{digitalTransformation.training.tagline}</p>
          <h2 className="mt-2 text-[1.6rem] font-semibold text-oak-charcoal">{digitalTransformation.training.title}</h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-oak-charcoal/70">{digitalTransformation.training.summary}</p>
          <h3 className="mt-8 text-[1.1rem] font-semibold text-oak-charcoal">Training Areas</h3>
          <ul className="mt-4 space-y-3.5">
            {digitalTransformation.training.areas.map((a) => (
              <li key={a} className="flex items-start gap-2.5 text-[0.96rem] text-oak-charcoal/75">
                <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-oak-green" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="digital-consulting" className="scroll-mt-24 border-t border-oak-line py-16 md:py-20">
        <div className="container-oak max-w-2xl">
          <p className="text-[0.85rem] font-medium text-oak-amber-dark">{digitalTransformation.consulting.tagline}</p>
          <h2 className="mt-2 text-[1.6rem] font-semibold text-oak-charcoal">{digitalTransformation.consulting.title}</h2>
          <p className="mt-3 text-[1.02rem] leading-relaxed text-oak-charcoal/70">{digitalTransformation.consulting.summary}</p>
          <h3 className="mt-8 text-[1.1rem] font-semibold text-oak-charcoal">Advisory Areas</h3>
          <ul className="mt-4 space-y-3.5">
            {digitalTransformation.consulting.areas.map((a) => (
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
