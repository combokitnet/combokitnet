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
  redirects: async () => {
    return [
      "/2fa",
      "/audio-player",
      "/cadence-to-go",
      "/css-to-js",
      "/css-to-tailwind",
      "/flow-to-javascript",
      "/flow-to-typescript-declaration",
      "/flow-to-typescript",
      "/graphql-to-components",
      "/graphql-to-flow",
      "/graphql-to-fragment-matcher",
      "/graphql-to-introspection-json",
      "/graphql-to-java",
      "/graphql-to-resolvers-signature",
      "/graphql-to-schema-ast",
      "/graphql-to-typescript-mongodb",
      "/graphql-to-typescript",
      "/html-to-jsx",
      "/html-to-pug",
      "/js-object-to-json",
      "/json-schema-to-protobuf",
      "/json-schema-to-typescript",
      "/json-schema-to-zod",
      "/json-to-big-query",
      "/json-to-flow",
      "/json-to-go-bson",
      "/json-to-go",
      "/json-to-graphql",
      "/json-to-io-ts",
      "/json-to-java",
      "/json-to-jsdoc",
      "/json-to-json-schema",
      "/json-to-kotlin",
      "/json-to-mobx-state-tree",
      "/json-to-mongoose",
      "/json-to-mysql",
      "/json-to-proptypes",
      "/json-to-rust-serde",
      "/json-to-sarcastic",
      "/json-to-scala-case-class",
      "/json-to-toml",
      "/json-to-typescript",
      "/json-to-yaml",
      "/json-to-zod",
      "/jsonld-to-compacted",
      "/jsonld-to-expanded",
      "/jsonld-to-flattened",
      "/jsonld-to-framed",
      "/jsonld-to-normalized",
      "/jsonld-to-nquads",
      "/markdown-to-html",
      "/object-styles-to-template-literal",
      "/svg-to-jsx",
      "/svg-to-react-native",
      "/tiny-gif",
      "/tiny-jpg",
      "/tiny-png",
      "/tiny-svg",
      "/tiny-webp",
      "/toml-to-json",
      "/toml-to-yaml",
      "/typescript-to-flow",
      "/typescript-to-javascript",
      "/typescript-to-json-schema",
      "/typescript-to-typescript-declaration",
      "/typescript-to-zod",
      "/xml-to-json",
      "/yaml-to-json",
      "/yaml-to-toml",
    ].map((m) => ({
      source: m,
      destination: "/",
      permanent: true,
    }));
  },
};

export default nextConfig;
