import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";
import localeMaps from "./public/locales.json" assert { type: "json" };

if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

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
