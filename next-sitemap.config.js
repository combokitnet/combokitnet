/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://combokit.net",
  generateRobotsTxt: true,
  exclude: ["/author", "/api", "/tools/og-image"],
  sitemapSize: 5000,
};
