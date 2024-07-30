import AppLayout from "@/components/AppLayout";
import TitleTool from "../ToolPage/TitleTool";
import { TTool } from "../ToolPage/types";

export default function ToolSamplePage({ data }: { data: TTool }) {
  console.log("ToolSamplePage", data);

  return (
    <AppLayout>
      <TitleTool data={data} />
      {/* main tool */}
      <div className="container mx-auto">main tool</div>
      {/* info, guide, why, how,... */}
      <div className="container mx-auto">info, guide, why, how,...</div>
    </AppLayout>
  );
}
