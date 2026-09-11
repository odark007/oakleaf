import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, getServiceBySlug } from "@/data/services";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { getIcon } from "@/lib/icons";

const CheckCircle2 = getIcon("CheckCircle2");
const ArrowUpRight = getIcon("ArrowUpRight");

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);
  const otherServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero eyebrow="Service" title={service.title} description={service.intro}>
        <div className="mt-3 text-oak-green">
          <Icon size={30} strokeWidth={1.6} />
        </div>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="container-oak grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {service.areas && (
              <div>
                <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">
                  Training Areas Include
                </h2>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {service.areas.map((area) => (
                    <li key={area} className="flex items-start gap-2.5 text-[0.94rem] text-oak-charcoal/75">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-oak-green" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.bullets && (
              <div>
                <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">
                  {service.slug === "leadership-development"
                    ? "Our Leadership Solutions Include"
                    : service.slug === "organizational-development"
                    ? "Our Organizational Development Services Include"
                    : service.slug === "human-resource-consulting"
                    ? "Our HR Consulting Services Include"
                    : service.slug === "performance-management"
                    ? "We Support Organizations With"
                    : service.slug === "consulting-advisory"
                    ? "We Provide Consulting Support In"
                    : "Programs Can Include"}
                </h2>
                <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[0.94rem] text-oak-charcoal/75">
                      <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-oak-green" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.delivery && (
              <div className="mt-12">
                <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">
                  Delivered Through
                </h2>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {service.delivery.map((d) => (
                    <span
                      key={d}
                      className="border border-oak-line px-3.5 py-1.5 text-[0.85rem] text-oak-charcoal/75"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {service.closing && (
              <p className="mt-10 border-l-2 border-oak-amber pl-5 text-[1.05rem] leading-relaxed text-oak-charcoal/75">
                {service.closing}
              </p>
            )}
          </div>

          <aside className="lg:pl-6">
            <div className="border border-oak-line bg-oak-surface-alt p-7">
              <h2 className="text-[1.05rem] font-semibold text-oak-charcoal">
                Talk to us about {service.shortTitle.toLowerCase()}
              </h2>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-oak-charcoal/65">
                Every engagement starts with a conversation about your organization's goals
                and challenges.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-oak-green"
              >
                Request a consultation
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="mt-8">
              <h2 className="text-[0.85rem] font-medium uppercase tracking-wide text-oak-charcoal/40">
                Related services
              </h2>
              <ul className="mt-4 space-y-3">
                {otherServices.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="text-[0.92rem] font-medium text-oak-charcoal/80 hover:text-oak-green"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
