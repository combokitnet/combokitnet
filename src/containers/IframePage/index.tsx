import AppLayout from "@/components/AppLayout";
import TitleTool from "../ToolPage/TitleTool";
import { TTool } from "../ToolPage/types";

export default function IframePage({ data }: { data: TTool }) {
  console.log("IframePage", data);

  return (
    <AppLayout>
      <TitleTool data={data} />
      <iframe
        className="w-full h-[calc(100vh-64px)]"
        src="http://localhost:5500/dev/image-optimization.html"
      />
    </AppLayout>
  );
}
