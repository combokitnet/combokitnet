import { APP_DOMAIN, APP_NAME, APP_SOCIAL } from "@/configs/const";
import { NextSeo } from "next-seo";
import { TTool } from "./types";

export default function ToolSeo({ tool }: { tool: TTool }) {
  return (
    <NextSeo
      title={`${tool?.name} | ${tool?.description}`}
      description={tool?.description}
      canonical={`https://${APP_DOMAIN}${tool?.pathUrl}`}
      openGraph={{
        url: `https://${APP_DOMAIN}${tool.pathUrl}`,
        title: tool?.name,
        description: tool?.description,
        images: [
          {
            url: tool?.ogImageUrl || tool?.iconUrl,
            alt: tool?.name,
            type: "image/png",
          },
        ],
        site_name: APP_NAME,
      }}
      twitter={{
        handle: APP_SOCIAL?.twitter,
        site: APP_SOCIAL?.twitter,
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          property: "dc:creator",
          content: APP_NAME,
        },
        {
          name: "application-name",
          content: APP_NAME,
        },
        {
          name: "keywords",
          content: tool.suggestData.join(", "),
        },
      ]}
    />
  );
}
