import { MetadataRoute } from "next";

const BASE = "https://www.standrewsflats.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/subscribe`,lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/analytics`,lastModified: new Date(), changeFrequency: "daily",   priority: 0.7 },
    { url: `${BASE}/privacy`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/agents`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/guide`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/blog`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/st-andrews-rental-scams`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/best-streets-st-andrews`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/housing-timeline-st-andrews`,    lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog/second-year-housing-scramble`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog/parents-guide-student-housing`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
