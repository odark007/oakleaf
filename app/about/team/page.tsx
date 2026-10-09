import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { teamMembers } from "@/data/team";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the team behind Oakleaf Training & Consulting — dedicated professionals committed to developing people and organizations.",
  alternates: { canonical: "/about/team" },
};

const Linkedin = getIcon("Linkedin");

export default function TeamPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-oak-line bg-oak-surface-alt">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/Diverse Team in a Modern Office.png')" }}
        />
        <div className="absolute inset-0 bg-white/85" />
        <div className="relative">
      <PageHero
        eyebrow="Our Team"
        title="The people behind Oakleaf"
        description="Meet the dedicated professionals committed to developing people and organizations."
        transparent
      />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-oak">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="border border-oak-line bg-white p-6"
              >
                <div className="relative h-48 w-full overflow-hidden bg-oak-surface-alt">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="mt-5 text-[1.15rem] font-semibold text-oak-charcoal">
                  {member.name}
                </h3>
                <p className="mt-1 text-[0.92rem] font-medium text-oak-green">
                  {member.designation}
                </p>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-oak-charcoal/70">
                  {member.bio}
                </p>
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-[0.88rem] font-medium text-oak-charcoal/60 hover:text-oak-green"
                >
                  <Linkedin size={18} />
                  LinkedIn
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
