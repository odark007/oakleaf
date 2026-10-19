import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";
import { services } from "@/data/services";
import { approachPages } from "@/data/approach-pages";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain;
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/about/team",
    "/services",
    "/approach",
    "/programs",
    "/programs/certified-trainer",
    "/programs/certified-trainer/register",
    "/programs/mldp",
    "/programs/managing-people",
    "/digital-transformation",
    "/contact",
  ];

  const serviceRoutes = services.map((s) => `/services/${s.slug}`);
  const approachRoutes = approachPages.map((p) => `/approach/${p.slug}`);

  const allRoutes = [...staticRoutes, ...serviceRoutes, ...approachRoutes];

  return allRoutes.map((route) => ({
    url: route === "" ? base : `${base}${route}/`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.split("/").length > 2 ? 0.6 : 0.8,
  }));
}
