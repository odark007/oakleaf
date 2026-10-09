import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { approachPages, getApproachPageBySlug } from "@/data/approach-pages";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";

export function generateStaticParams() {
  return approachPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getApproachPageBySlug(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.tagline,
    alternates: { canonical: `/approach/${page.slug}` },
  };
}

export default async function ApproachDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getApproachPageBySlug(slug);
  if (!page) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Collaborative Team Meeting in Modern Office.png')" }}
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative">
          <PageHero title={page.title} description={page.intro} transparent />
        </div>
      </section>
      <section className="py-16 md:py-20">
        <div className="container-oak">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.blocks.map((block) => (
              <div key={block.title} className="border-l-2 border-oak-green bg-oak-surface-alt p-6">
                <h2 className="text-[1.05rem] font-semibold text-oak-charcoal">
                  {block.title}
                </h2>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-oak-charcoal/65">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaSection />
    </>
  );
}
