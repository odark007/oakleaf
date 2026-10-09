import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { coreValues } from "@/data/site";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Oakleaf Training & Consulting is a professional training and consulting firm committed to helping organizations unlock the potential of their people.",
  alternates: { canonical: "/about" },
};

const aboutNav = [
  { href: "#who-we-are", label: "Who We Are" },
  { href: "#vision", label: "Our Vision" },
  { href: "#mission", label: "Our Mission" },
  { href: "#values", label: "Core Values" },
];

export default function AboutPage() {
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
        eyebrow="About Oakleaf"
        title="Your partner for people and organizational performance"
        description="Oakleaf Training & Consulting is a professional training and consulting firm committed to helping organizations unlock the potential of their people."
        transparent
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {aboutNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.88rem] font-medium text-oak-charcoal/60 hover:text-oak-green"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </PageHero>
        </div>
      </section>

      <section id="who-we-are" className="scroll-mt-24 py-16 md:py-20">
        <div className="container-oak grid gap-10 md:grid-cols-[0.3fr_0.7fr]">
          <h2 className="text-[1.6rem] font-semibold text-oak-charcoal">Who We Are</h2>
          <div className="max-w-2xl space-y-5 text-[1.02rem] leading-relaxed text-oak-charcoal/70">
            <p>
              We work with organizations to understand their unique challenges and develop
              practical solutions that address performance gaps, leadership challenges,
              employee capability, organizational culture, and operational effectiveness.
            </p>
            <p>
              Our approach goes beyond delivering training. We focus on measurable learning,
              practical application, behavioral change, and organizational impact.
            </p>
            <p>
              Whether you need to develop your leaders, strengthen your workforce, improve
              team performance, or build effective organizational systems, Oakleaf provides
              solutions designed around your needs.
            </p>
          </div>
        </div>
      </section>

      <section id="vision" className="scroll-mt-24 border-t border-oak-line bg-oak-surface-alt py-16 md:py-20">
        <div className="container-oak grid gap-10 md:grid-cols-[0.3fr_0.7fr]">
          <h2 className="text-[1.6rem] font-semibold text-oak-charcoal">Our Vision</h2>
          <p className="max-w-2xl text-[1.15rem] leading-relaxed text-oak-charcoal/80">
            To be a trusted partner in developing people and organizations for sustainable
            performance and positive impact.
          </p>
        </div>
      </section>

      <section id="mission" className="scroll-mt-24 py-16 md:py-20">
        <div className="container-oak grid gap-10 md:grid-cols-[0.3fr_0.7fr]">
          <h2 className="text-[1.6rem] font-semibold text-oak-charcoal">Our Mission</h2>
          <p className="max-w-2xl text-[1.15rem] leading-relaxed text-oak-charcoal/80">
            To provide high-quality training, consulting, strategy, and organizational
            development solutions that build capable people, effective leaders, resilient
            organizations, and thriving communities.
          </p>
        </div>
      </section>

      <section id="values" className="scroll-mt-24 border-t border-oak-line bg-oak-surface-alt py-16 md:py-20">
        <div className="container-oak">
          <h2 className="text-[1.6rem] font-semibold text-oak-charcoal">Our Core Values</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => {
              const Icon = getIcon(value.icon);
              return (
                <div key={value.title} className="border border-oak-line bg-white p-6">
                  <Icon size={24} strokeWidth={1.6} className="text-oak-green" />
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-oak-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-oak-charcoal/65">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
