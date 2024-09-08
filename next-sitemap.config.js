/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://combokit.net",
  generateRobotsTxt: true,
  exclude: ["/author", "/api"],
  sitemapSize: 5000,
};
