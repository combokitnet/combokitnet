import AppLayout from "@/components/AppLayout";
import TitleTool from "../ToolPage/TitleTool";
import { TTool } from "../ToolPage/types";

export default function ImageOptimizationPage({ data }: { data: TTool }) {
  console.log(data);

  return (
    <AppLayout>
      <TitleTool data={data} />
      {/* main tool */}
      <div className="container mx-auto">body</div>
      {/* info, guide, why, how,... */}
      <div className="container mx-auto">footer</div>
    </AppLayout>
  );
}
