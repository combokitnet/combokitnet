import AppLayout from "@/components/AppLayout";
import { PropsWithChildren } from "react";
import TitleTool from "../ToolPage/TitleTool";
import ToolKeyWord from "../ToolPage/ToolKeyWord";
import { TTool } from "../ToolPage/types";

interface ToolMainProps extends PropsWithChildren {
  data: TTool;
}

export default function ToolMain({ data, children }: ToolMainProps) {
  return (
    <AppLayout>
      {/* header tool: info, desc,... */}
      <TitleTool data={data} />

      {/* main tool */}
      {children}

      {/* keywords suggest list  */}
      <ToolKeyWord data={data} />
    </AppLayout>
  );
}
