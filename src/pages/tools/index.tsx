import ToolPage from "@/containers/ToolPage";
import { TTool, TToolTag } from "@/containers/ToolPage/types";
import { GetServerSideProps } from "next";

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tool`);
  const tools: TToolRes = await res.json();

  return {
    props: {
      tools: tools?.data?.tools,
      tags: tools?.data?.tags,
    },
  };
};
