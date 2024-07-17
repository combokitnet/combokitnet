import { APP_DOMAIN, APP_NAME, APP_SOCIAL } from "@/configs/const";
import ImageTinyPage from "@/containers/ImageCompressionPage";
import { TTool, TToolDetailRes } from "@/containers/ToolPage/types";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

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
      <ImageTinyPage data={tool} />
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
        tool: fakeData,
      },
    };
  }
};

const fakeData = {
  id: "89aaa17c-eeb1-4ae0-a62e-b900c4bea133",
  createdAt: "2024-07-14T10:10:08.294Z",
  updatedAt: "2024-07-14T10:10:08.294Z",
  name: "Image Compression",
  pathUrl: "/tools/image-compression",
  iconUrl: "/images/tools/image_compression.svg",
  description: "WebP, PNG, JPEG, GIF and SVG Compression",
  rate: 0,
  usageCount: 0,
  favoriteCount: 0,
  isHot: false,
  status: "active",
  suggestData: [
    "image",
    "compression",
    "tiny",
    "webp",
    "png",
    "gif",
    "svg",
    "jpeg",
    "optimize",
    "reduce size",
  ],
  author: {
    id: "79aec2ed-377a-46c8-9796-1002f0b225a2",
    username: "ComboKit.Net",
  },
  tags: [
    {
      name: "utility",
      slug: "utility",
      color: "#ff0000",
    },
    {
      name: "image",
      slug: "image",
      color: "#ffa133",
    },
  ],
};
