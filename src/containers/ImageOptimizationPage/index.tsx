import AppLayout from "@/components/AppLayout";
import TitleTool from "../ToolPage/TitleTool";
import { TTool } from "../ToolPage/types";
import Main from "./Main";

export default function ImageOptimizationPage({ data }: { data: TTool }) {
  return (
    <AppLayout>
      <TitleTool data={data} />
      {/* main tool */}
      <div className="container mx-auto">
        <Main />
      </div>
      {/* info, guide, why, how,... */}
      <div className="container mx-auto">footer</div>
    </AppLayout>
  );
}
