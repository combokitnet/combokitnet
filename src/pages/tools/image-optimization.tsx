import ImageOptimizationPage from "@/containers/ImageOptimizationPage";
import ToolSeo from "@/containers/ToolPage/ToolSeo";
import { TTool, TToolDetailRes } from "@/containers/ToolPage/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import { fakeDataToolForDev } from ".";

export const config = {
  runtime: "experimental-edge",
};

export default function ImageTiny({ tool }: { tool: TTool }) {
  return (
    <>
      <ToolSeo tool={tool} />
      <ImageOptimizationPage data={tool} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tool-detail?path=/tools/image-optimization`
    );
    const data: TToolDetailRes = res.data;

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
