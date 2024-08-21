import { APP_DOMAIN, APP_NAME, APP_SOCIAL } from "@/configs/const";
import PasswordGeneratorPage from "@/containers/PasswordGeneratorPage";
import { TTool, TToolDetailRes } from "@/containers/ToolPage/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import { fakeDataToolForDev } from ".";

export const config = {
  runtime: "experimental-edge", // nodejs, experimental-edge
};

export default function PasswordGenerator({ tool }: { tool: TTool }) {
  return (
    <>
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
      <PasswordGeneratorPage data={tool} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tool-detail?path=/tools/password-generator`
    );
    const data: TToolDetailRes = res.data;

    return {
      props: {
        tool: data?.data,
      },
    };
  } catch (error) {
    console.log("Get detail error, using fake data", error);
    return {
      props: {
        tool: fakeDataToolForDev,
      },
    };
  }
};
