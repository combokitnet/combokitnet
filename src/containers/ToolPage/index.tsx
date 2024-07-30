import AppLayout from "@/components/AppLayout";
import useSearchParams from "@/hooks/useSearchParams";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ListTag from "./ListTag";
import ToolItem from "./ToolItem";
import { TTool, TToolTag } from "./types";

export default function ToolPage({
  toolData,
  tags,
}: {
  toolData: TTool[];
  tags: TToolTag[];
}) {
  const fuse = new Fuse(toolData, {
    keys: ["name", "tag", "description", "author", "suggestData"],
    ignoreLocation: true,
  });
  console.log("toolTags", tags);
  const [tag, setTag] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [tools, setTools] = useState(toolData);
  const { getSearchParam, setSearchParam, searchParams } = useSearchParams();

  useEffect(() => {
    const t = getSearchParam("tag");
    if (t && t?.length > 0) {
      setTag(t.split(","));
    }
  }, [searchParams]);

  useEffect(() => {
    let t = [...toolData];
    if (search) {
      t = fuse.search(search).map((result) => result.item);
    }

    if (tag.length > 0) {
      let dataSetTag = new Set(tag);
      t = t.filter((m) => {
        return m.tags.some((item) => dataSetTag.has(item.name));
      });
    }
    setTools(t);
  }, [search, tag]);

  return (
    <AppLayout>
      <div className="container mx-auto pt-[200px]">
        <div className="flex justify-between mb-[18px] p-[0px_24px] flex-col md:flex-row gap-[12px]">
          <ListTag
            toolTags={tags}
            tag={tag}
            setTag={setTag}
            setSearchParam={setSearchParam}
          />

          <div className="relative flex items-center text-sm">
            <FaSearch
              color="gray"
              className="z-0 absolute left-[7px] h-4 w-4 text-secondary"
            />

            <input
              className="focus-visible:none flex rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-[34px] w-full md:w-[230px] pl-9"
              placeholder="Search for anything"
              type="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </div>

        {/* list tools  */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-[0px_24px]">
          {tools?.length > 0
            ? tools.map((m, i) => (
                <ToolItem toolTags={tags} data={m} key={m.name} />
              ))
            : "No tool here"}
        </div>
      </div>
    </AppLayout>
  );
}
