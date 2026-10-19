import { siteConfig } from "@/data/site";
import { faqs } from "@/data/site";

export function organizationJsonLd() {
  const socials = [siteConfig.linkedin, siteConfig.facebook].filter(
    (u) => u && u !== "#"
  );
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.domain,
    logo: `${siteConfig.domain}/favicon.ico`,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
    },
    ...(socials.length > 0 ? { sameAs: socials } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.path}`,
    })),
  };
}

export function courseJsonLd(opts: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.domain}${opts.path}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
  };
}

export function educationEventJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  startDate: string;
  endDate: string;
  locality: string;
  venueName?: string;
  price?: string;
  priceCurrency?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: opts.name,
    description: opts.description,
    url: `${siteConfig.domain}${opts.path}#sessions`,
    startDate: opts.startDate,
    endDate: opts.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: opts.venueName ?? opts.locality,
      address: {
        "@type": "PostalAddress",
        addressLocality: opts.locality,
        addressCountry: "GH",
      },
    },
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    ...(opts.price
      ? {
          offers: {
            "@type": "Offer",
            price: opts.price,
            priceCurrency: opts.priceCurrency ?? "GHS",
            availability: "https://schema.org/InStock",
            url: `${siteConfig.domain}${opts.path}#sessions`,
          },
        }
      : {}),
  };
}

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    url: siteConfig.domain,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
    },
    areaServed: "GH",
    priceRange: "$$",
  };
}

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}
