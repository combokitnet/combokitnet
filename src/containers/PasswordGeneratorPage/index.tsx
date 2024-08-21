import AppLayout from "@/components/AppLayout";
import TitleTool from "../ToolPage/TitleTool";
import { TTool } from "../ToolPage/types";
import InfoSection from "./InfoSection";
import PasswordGenerator from "./PasswordGenerator";

export default function PasswordGeneratorPage({ data }: { data: TTool }) {
  return (
    <AppLayout>
      {/* header tool: info, desc,... */}
      <TitleTool data={data} />
      {/* main tool */}
      <PasswordGenerator />
      {/* info, guide, why, how,... */}
      <InfoSection />
    </AppLayout>
  );
}
