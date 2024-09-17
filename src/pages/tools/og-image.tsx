import { request } from "@/configs/request";
import TitleTool from "@/containers/ToolPage/TitleTool";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const config = {
  runtime: "experimental-edge",
};

export default function OGImage() {
  const router = useRouter();
  const { type, tool } = router?.query;
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (document) {
      const loader = document.getElementById("globalLoader");
      if (loader) {
        loader.style.display = "none";
      }
    }
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (type === "tool" && tool) {
        try {
          const res: AxiosResponse = await request(
            `/tool-detail?path=${tool}`,
            {
              method: "GET",
            }
          );
          if (res?.data) {
            setData(res?.data);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getData().then().catch();
  }, [type, tool]);

  console.log(`Type: ${type}, Tool: ${tool}`, data);

  if (type === "tool" && data?.id) {
    return <TitleTool data={data} />;
  }
  return <div>OG Image Gen</div>;
}

// Intrinsic size:	1005 × 251 px
// 525 × 275 px
