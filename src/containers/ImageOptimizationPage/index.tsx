import AppLayout from "@/components/AppLayout";
import TitleTool from "../ToolPage/TitleTool";
import { TTool } from "../ToolPage/types";
import ImageGuide from "./ImageGuide";
import ImageMain from "./ImageMain";

export default function ImageOptimizationPage({ data }: { data: TTool }) {
  return (
    <AppLayout>
      {/* header tool: info, desc,... */}
      <TitleTool data={data} />
      {/* main tool: write your tool here */}
      <ImageMain />
      {/* info, guide, why, how, compare with competitor, common faq, ... */}
      <ImageGuide />
    </AppLayout>
  );
}
