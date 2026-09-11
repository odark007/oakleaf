import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { CtaSection } from "@/components/sections/cta-section";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Training and capacity development, leadership development, organizational development, HR consulting, performance management, consulting and advisory, and team building — customized to your organization.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Practical solutions across seven areas"
        description="Every service can be customized to your organization's context — from a single workshop to a multi-year capacity-building partnership."
      />
      <section className="py-16 md:py-20">
        <div className="container-oak">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
