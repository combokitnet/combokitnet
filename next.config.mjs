import localeMaps from "./public/locales.json" assert { type: "json" };

export const locales = localeMaps.map((n) => n.code);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    defaultLocale: "en",
    locales: locales,
  },
};

export default nextConfig;
