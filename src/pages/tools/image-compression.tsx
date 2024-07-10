import { colors } from "@/configs/color";
import ImageTinyPage from "@/containers/ImageCompressionPage";
import { GetServerSideProps } from "next";
import { TTool } from "../api/tool";

export default function ImageTiny() {
  return <ImageTinyPage />;
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
