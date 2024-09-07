import ToolMain from "../ToolPage/ToolMain";
import { TTool } from "../ToolPage/types";
import ImageGuide from "./ImageGuide";
import ImageMain from "./ImageMain";

export default function ImageOptimizationPage({ data }: { data: TTool }) {
  return (
    <ToolMain data={data}>
      {/* main tool: write your tool here */}
      <ImageMain />
      {/* info, guide, why, how, compare with competitor, common faq, ... */}
      <ImageGuide />
    </ToolMain>
  );
}
