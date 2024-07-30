import { APP_DOMAIN, APP_NAME, APP_SOCIAL } from "@/configs/const";
import ImageOptimizationPage from "@/containers/ImageOptimizationPage";
import { TTool, TToolDetailRes } from "@/containers/ToolPage/types";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { fakeDataToolForDev } from ".";

export default function ImageTiny({ tool }: { tool: TTool }) {
  return (
    <>
      <NextSeo
        title={tool?.name}
        description={tool?.description}
        canonical={`https://${APP_DOMAIN}${tool.pathUrl}`}
        openGraph={{
          url: `https://${APP_DOMAIN}${tool.pathUrl}`,
          title: tool?.name,
          description: tool?.description,
          images: [
            {
              url: tool?.iconUrl,
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
      <ImageOptimizationPage data={tool} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tool-detail?path=${req?.url}`
    );
    const data: TToolDetailRes = await res.json();

    return {
      props: {
        tool: data?.data,
      },
    };
  } catch (error) {
    return {
      props: {
        tool: fakeDataToolForDev,
      },
    };
  }
};
