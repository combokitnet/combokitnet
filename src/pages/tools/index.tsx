import ToolPage from "@/containers/ToolPage";
import { TTool, TToolTag } from "@/containers/ToolPage/types";
import { GetServerSideProps } from "next";

export const config = {
  runtime: "experimental-edge",
};

export const fakeDataToolForDev = {
  id: "89aaa17c-eeb1-4ae0-a62e-b900c4bea133",
  createdAt: "2024-07-14T10:10:08.294Z",
  updatedAt: "2024-07-14T10:10:08.294Z",
  name: "Image Optimization",
  pathUrl: "/tools/image-optimization",
  iconUrl: "/images/tools/image_compression.svg",
  description: "WebP, PNG, JPEG, GIF and SVG optimization",
  rate: 4.5,
  usageCount: 12000,
  favoriteCount: 100,
  isHot: false,
  status: "active",
  suggestData: ["image", "compression", "optimization"],
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

export type TToolRes = {
  message: string;
  data: {
    tools: Array<{
      id: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: any;
      name: string;
      pathUrl: string;
      iconUrl: string;
      description: string;
      rate: number;
      usageCount: number;
      favoriteCount: number;
      isHot: boolean;
      status: string;
      suggestData: Array<string>;
      author: {
        id: string;
        username: string;
      };
      tags: Array<{
        id: string;
        name: string;
        slug: string;
        color: string;
      }>;
    }>;
    tags: Array<{
      name: string;
      slug: string;
      color: string;
    }>;
  };
  success: boolean;
};

export type ToolsPageProps = {
  tools: TTool[];
  tags: TToolTag[];
};

export default function Tools({ tools, tags }: ToolsPageProps) {
  return <ToolPage toolData={tools} tags={tags} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tool`);
    const tools: TToolRes = await res.json();

    return {
      props: {
        tools: tools?.data?.tools,
        tags: tools?.data?.tags,
      },
    };
  } catch (error) {
    return {
      props: {
        tools: [fakeDataToolForDev],
        tags: fakeDataToolForDev.tags,
      },
    };
  }
};
