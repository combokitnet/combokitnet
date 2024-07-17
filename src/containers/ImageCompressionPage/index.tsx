import AppLayout from "@/components/AppLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { TTool } from "../ToolPage/types";

export default function ImageCompressionPage({ data }: { data: TTool }) {
  console.log(data);
  return (
    <AppLayout>
      <div className="pt-[60px]"></div>
      <div className="container mx-auto">
        <div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: data?.name },
            ]}
          />
        </div>
        <div className="relative">
          <div className="flex items-center">
            <img
              className="w-[50px] h-[50px]"
              src={data?.iconUrl}
              alt={data?.name}
            />
            <div>
              <h2>{data?.name}</h2>
              <p>{data?.description}</p>
              <div>
                <div>
                  By <span>{data?.author?.username}</span>
                </div>
                <div>star</div>
                <div>used</div>
              </div>
            </div>
          </div>
          <div className="absolute right-0">
            <div>tim</div>
            <div>vote</div>
            <div>feedback</div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">body</div>
      <div className="container mx-auto">footer</div>
    </AppLayout>
  );
}
