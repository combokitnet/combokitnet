import { colors } from "@/configs/color";
import ToolPage from "@/containers/ToolPage";
import { GetServerSideProps } from "next";
import { TTool, TToolTag } from "../api/tool";

export type ToolsPageProps = {
  tools: TTool[];
  toolTags: TToolTag[];
};

export default function Tools({ tools, toolTags }: ToolsPageProps) {
  return <ToolPage toolData={tools} toolTags={toolTags} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await fetch(`http://${req?.headers?.host}/api/tool`);
  const tools: TTool[] = await res.json();
  const tags = new Set<string>(
    tools
      .map((m) => m.tag)
      .flat()
      .sort()
  );

  const toolTags = Array.from(tags).map((m, i) => ({
    tag: m,
    tagColor: colors[i],
  }));

  return {
    props: {
      tools,
      toolTags,
    },
  };
};
