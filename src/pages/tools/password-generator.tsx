import PasswordGeneratorPage from "@/containers/PasswordGeneratorPage";
import ToolSeo from "@/containers/ToolPage/ToolSeo";
import { TTool, TToolDetailRes } from "@/containers/ToolPage/types";
import axios from "axios";
import { GetServerSideProps } from "next";
import { fakeDataToolForDev } from ".";

export const config = {
  runtime: "experimental-edge", // nodejs, experimental-edge
};

export default function PasswordGenerator({ tool }: { tool: TTool }) {
  return (
    <>
      <ToolSeo tool={tool} />
      <PasswordGeneratorPage data={tool} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/tool-detail`,
      {
        params: {
          name: "password-generator",
        },
      }
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
