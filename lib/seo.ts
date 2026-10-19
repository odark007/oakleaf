import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type SocialOpts = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

/**
 * Builds per-page Open Graph + Twitter overrides.
 * Static-export safe: plain metadata, no dynamic image routes.
 */
export function socialMetadata({
  title,
  description,
  path,
  image = "/og-image.png",
  imageWidth,
  imageHeight,
}: SocialOpts): Pick<Metadata, "openGraph" | "twitter"> {
  const url = path === "/" ? siteConfig.domain : `${siteConfig.domain}${path}/`;
  const ogImage =
    imageWidth && imageHeight
      ? { url: image, width: imageWidth, height: imageHeight, alt: title }
      : { url: image, alt: title };

  return {
    openGraph: {
      type: "website",
      locale: "en_GH",
      url,
      siteName: siteConfig.name,
      title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
