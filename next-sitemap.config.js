/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://duvcoretechnology.vercel.app",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/"] },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_SITE_URL || "https://duvcoretechnology.vercel.app"}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // Páginas principales con mayor prioridad
    const priorities = {
      "/": 1.0,
      "/productos": 0.9,
      "/simulador": 0.9,
      "/servicios": 0.8,
      "/nosotros": 0.6,
      "/faq": 0.6,
      "/blog": 0.7,
    };
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] ?? config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
