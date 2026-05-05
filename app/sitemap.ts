import { MetadataRoute } from "next";
import { readdirSync } from "fs";
import { join } from "path";

const BASE = "https://www.standrewsflats.uk";

function getBlogSlugs(): string[] {
  try {
    const blogDir = join(process.cwd(), "app", "blog");
    return readdirSync(blogDir, { withFileTypes: true })
      .filter((d) => d.isDirectory() && d.name !== "page.tsx")
      .map((d) => d.name);
  } catch {
    return [];
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`,          lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/subscribe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/guide`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/analytics`, lastModified: new Date(), changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE}/agents`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`,      lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/privacy`,   lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getBlogSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
