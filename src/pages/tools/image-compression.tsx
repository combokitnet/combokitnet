import ImageTinyPage from "@/containers/ImageCompressionPage";
import { TTool, TToolDetailRes } from "@/containers/ToolPage/types";
import { GetServerSideProps } from "next";

export default function ImageTiny({ tool }: { tool: TTool }) {
  return <ImageTinyPage data={tool} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tool-detail?path=${req?.url}`
  );
  const data: TToolDetailRes = await res.json();

  return {
    props: {
      tool: data?.data,
    },
  };
};
