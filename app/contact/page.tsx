import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig, faqs } from "@/data/site";
import { getIcon } from "@/lib/icons";
import { faqPageJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Oakleaf Training & Consulting. Tell us about your organization and the challenge you want to address.",
  alternates: { canonical: "/contact" },
};

const Mail = getIcon("Mail");
const Phone = getIcon("Phone");
const MapPin = getIcon("MapPin");
const MessageCircle = getIcon("MessageCircle");

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd()) }}
      />
      <PageHero
        eyebrow="Contact"
        title="Let's build a stronger organization together"
        description="Whether you're developing better leaders, improving employee performance, or strengthening organizational systems, we're ready to partner with you."
      />

      <section className="py-16 md:py-20">
        <div className="container-oak grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">Get in touch</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3.5">
                <Mail size={19} className="mt-0.5 shrink-0 text-oak-green" />
                <div>
                  <p className="text-[0.8rem] text-oak-charcoal/50">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-[0.98rem] font-medium text-oak-charcoal hover:text-oak-green">
                    {siteConfig.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <Phone size={19} className="mt-0.5 shrink-0 text-oak-green" />
                <div>
                  <p className="text-[0.8rem] text-oak-charcoal/50">Phone</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-[0.98rem] font-medium text-oak-charcoal hover:text-oak-green">
                    {siteConfig.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <MessageCircle size={19} className="mt-0.5 shrink-0 text-oak-green" />
                <div>
                  <p className="text-[0.8rem] text-oak-charcoal/50">WhatsApp</p>
                  <p className="text-[0.98rem] font-medium text-oak-charcoal">{siteConfig.whatsapp}</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <MapPin size={19} className="mt-0.5 shrink-0 text-oak-green" />
                <div>
                  <p className="text-[0.8rem] text-oak-charcoal/50">Location</p>
                  <p className="text-[0.98rem] font-medium text-oak-charcoal">{siteConfig.location}</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-[1.3rem] font-semibold text-oak-charcoal">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="border-t border-oak-line bg-oak-surface-alt py-16 md:py-20">
        <div className="container-oak max-w-3xl">
          <h2 className="text-[1.6rem] font-semibold text-oak-charcoal">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>
    </>
  );
}
