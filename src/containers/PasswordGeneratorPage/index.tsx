import ToolMain from "../ToolPage/ToolMain";
import { TTool } from "../ToolPage/types";
import InfoSection from "./InfoSection";
import PasswordGenerator from "./PasswordGenerator";

export default function PasswordGeneratorPage({ data }: { data: TTool }) {
  return (
    <ToolMain data={data}>
      {/* main tool */}
      <PasswordGenerator />
      {/* info, guide, why, how,... */}
      <InfoSection />
    </ToolMain>
  );
}
