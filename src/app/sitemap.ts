import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bizautofy.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: Array<{ path: string; priority: number }> = [
    { path: "", priority: 1 },
    { path: "services", priority: 0.9 },
    { path: "pricing", priority: 0.9 },
    { path: "about", priority: 0.7 },
    { path: "contact", priority: 0.8 },
  ];
  return routes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path ? `/${path}` : ""}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
