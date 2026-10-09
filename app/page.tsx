import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceCard } from "@/components/sections/service-card";
import { StepTimeline } from "@/components/sections/step-timeline";
import { CtaSection } from "@/components/sections/cta-section";
import { services } from "@/data/services";
import { approachSteps } from "@/data/approach-steps";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Growing People. Strengthening Organizations. Creating Impact.",
  description:
    "Oakleaf Training & Consulting provides practical training, consulting, strategy, and organizational development solutions for businesses, non-profits, institutions, and leaders across Ghana.",
  alternates: { canonical: "/" },
};

const sectors = [
  "Businesses",
  "Non-Profit Organizations",
  "Government Institutions",
  "Educational Institutions",
  "Faith-Based Organizations",
  "Entrepreneurs & Professionals",
];

const ArrowUpRight = getIcon("ArrowUpRight");
const GraduationCap = getIcon("GraduationCap");
const Compass = getIcon("Compass");

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Professional Workshop in a Modern Conference Room-Oakleaf training-consulting.png')" }}
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="container-oak relative grid gap-12 py-20 md:grid-cols-[1.15fr_0.85fr] md:py-28">
          <div>
            <p className="text-[0.85rem] font-medium text-oak-green">
              Training &amp; Organizational Development, Ghana
            </p>
            <h1 className="mt-4 max-w-xl text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-oak-charcoal md:text-[3.4rem]">
              Growing people. Strengthening organizations. Creating impact.
            </h1>
            <p className="mt-6 max-w-lg text-[1.08rem] leading-relaxed text-oak-charcoal/70">
              We provide practical training, consulting, strategy, and organizational
              development solutions that help businesses, non-profits, institutions, and
              leaders improve performance and achieve sustainable results.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton href="/services" variant="primary" className="rounded-sm">
                Explore Our Services
              </LinkButton>
              <LinkButton href="/contact" variant="outline" className="rounded-sm">
                Talk to Us
              </LinkButton>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-4 border-t border-oak-line pt-8 md:border-t-0 md:border-l md:pl-10 md:pt-0">
            <p className="text-[0.8rem] font-medium uppercase tracking-wide text-oak-charcoal/40">
              What we do
            </p>
            <div className="space-y-5">
              {[
                "Training & Capacity Development",
                "Leadership Development",
                "Organizational Development",
                "HR Consulting & Performance Management",
              ].map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oak-amber" />
                  <span className="text-[0.98rem] text-oak-charcoal/80">{line}</span>
                </div>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-2 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-oak-green"
            >
              See all 7 service areas
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sectors strip */}
      <section className="border-b border-oak-line bg-white">
        <div className="container-oak flex flex-wrap items-center gap-x-8 gap-y-3 py-6">
          <span className="text-[0.8rem] font-medium text-oak-charcoal/45">
            Who we serve
          </span>
          {sectors.map((s) => (
            <span key={s} className="text-[0.85rem] text-oak-charcoal/60">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* Programs spotlight */}
      <section className="py-20 md:py-24">
        <div className="container-oak">
          <SectionHeading
            kicker="Flagship Programs"
            title="Two structured paths to build lasting capability"
            description="Alongside our customized engagements, Oakleaf runs two flagship programs designed for repeatable, organization-wide impact."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              href="/programs/certified-trainer"
              className="group flex flex-col justify-between bg-oak-green-deep p-8 text-white md:p-10"
            >
              <div>
                <GraduationCap size={28} strokeWidth={1.6} className="text-oak-amber" />
                <h3 className="mt-5 text-[1.4rem] font-semibold">
                  Become a Certified Trainer
                </h3>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-white/65">
                  A structured pathway for professionals who want to design and deliver
                  training with confidence, credibility, and measurable impact.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-oak-amber">
                Explore the program
                <ArrowUpRight size={15} />
              </span>
            </Link>

            <Link
              href="/programs/mldp"
              className="group flex flex-col justify-between border border-oak-line bg-oak-surface-alt p-8 md:p-10"
            >
              <div>
                <Compass size={28} strokeWidth={1.6} className="text-oak-green" />
                <h3 className="mt-5 text-[1.4rem] font-semibold text-oak-charcoal">
                  Management &amp; Leadership Development Program
                </h3>
                <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-oak-charcoal/65">
                  A tiered leadership program that builds management fundamentals for
                  supervisors and strategic capability for senior leaders.
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-oak-green">
                Explore the program
                <ArrowUpRight size={15} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="border-t border-oak-line bg-oak-surface-alt py-20 md:py-24">
        <div className="container-oak">
          <SectionHeading
            kicker="Our Services"
            title="Seven areas of practical support"
            description="Every engagement is customized to your organization's goals, industry, workforce, and specific performance challenges."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Approach teaser */}
      <section className="py-20 md:py-24">
        <div className="container-oak grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              kicker="Our Approach"
              title="From learning to lasting impact"
              description="Training should not end when participants leave the room. Our seven-stage approach carries every engagement from diagnosis through to measured organizational impact."
            />
            <div className="mt-8">
              <LinkButton href="/approach" variant="outline" className="rounded-sm">
                See our full approach
              </LinkButton>
            </div>
          </div>
          <StepTimeline steps={approachSteps} />
        </div>
      </section>

      <CtaSection />
    </>
  );
}
