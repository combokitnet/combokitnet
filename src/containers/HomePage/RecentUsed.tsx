import { useAppContext } from "@/contexts/AppContext";
import { formatLargeNumber } from "@/utils/number";
import { maxLength } from "@/utils/string";
import Link from "next/link";
import { useEffect } from "react";

export default function RecentUsed() {
  const { tools, fetchTools } = useAppContext();
  useEffect(() => {
    if (tools.length < 1) {
      fetchTools();
    }
  }, [fetchTools, tools]);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-8 text-gray-500 dark:text-gray-400">
          {tools?.map((tool) => (
            <Link key={tool?.name} href={tool?.pathUrl}>
              <div className="flex flex-row gap-3 items-center">
                <img
                  className="w-[35px] h-[35px]"
                  src={tool?.iconUrl}
                  alt={tool?.name}
                />
                <div>
                  <p className="font-bold flex flex-row gap-2">
                    {tool?.name}{" "}
                    <span
                      title={`Used ${tool?.usageCount}`}
                      className="flex text-[13px] flex-row items-center gap-1"
                    >
                      <span>{formatLargeNumber(tool?.usageCount)}</span>
                    </span>
                  </p>
                  <p className="text-[13px]" title={tool.description}>
                    {maxLength(tool?.description, 50, "end")}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
