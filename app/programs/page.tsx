import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { programs } from "@/data/programs";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Two flagship Oakleaf programs: Become a Certified Trainer, and the Management and Leadership Development Program (MLDP).",
  alternates: { canonical: "/programs" },
};

const GraduationCap = getIcon("GraduationCap");
const Compass = getIcon("Compass");
const ArrowUpRight = getIcon("ArrowUpRight");

export default function ProgramsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Collaborative Business Workshop in a Bright Office.png')" }}
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative">
      <PageHero
        eyebrow="Programs"
        title="Structured programs for lasting capability"
        description="Alongside our customized training and consulting engagements, Oakleaf runs two flagship programs built for repeatable, organization-wide impact."
        transparent
      />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-oak grid gap-6 md:grid-cols-2">
          <Link
            href="/programs/certified-trainer"
            className="group flex flex-col justify-between bg-oak-green-deep p-9 text-white"
          >
            <div>
              <GraduationCap size={30} strokeWidth={1.6} className="text-oak-amber" />
              <h2 className="mt-5 text-[1.5rem] font-semibold">{programs.certifiedTrainer.title}</h2>
              <p className="mt-3.5 max-w-sm text-[0.97rem] leading-relaxed text-white/65">
                {programs.certifiedTrainer.summary}
              </p>
            </div>
            <span className="mt-9 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-oak-amber">
              View program details
              <ArrowUpRight size={15} />
            </span>
          </Link>

          <Link
            href="/programs/mldp"
            className="group flex flex-col justify-between border border-oak-line bg-oak-surface-alt p-9"
          >
            <div>
              <Compass size={30} strokeWidth={1.6} className="text-oak-green" />
              <h2 className="mt-5 text-[1.5rem] font-semibold text-oak-charcoal">
                {programs.mldp.title}
              </h2>
              <p className="mt-3.5 max-w-sm text-[0.97rem] leading-relaxed text-oak-charcoal/65">
                {programs.mldp.summary}
              </p>
            </div>
            <span className="mt-9 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-oak-green">
              View program details
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
