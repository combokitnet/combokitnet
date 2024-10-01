import AppLayout from "@/components/AppLayout";
import useSearchParams from "@/hooks/useSearchParams";
import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Feedback, { FeedbackType } from "./Feedback";
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

  const [tag, setTag] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [tools, setTools] = useState(toolData);
  const { getSearchParam, setSearchParam, initSearchParams } =
    useSearchParams();

  useEffect(() => {
    if (initSearchParams.size < 1) return;

    const t = getSearchParam("tag");
    const s = getSearchParam("search");

    if (t && t?.length > 0) {
      setTag(t.split(","));
    }

    if (s) {
      setSearch(s);
    }
  }, [initSearchParams]);

  useEffect(() => {
    let t = [...toolData];
    if (search) {
      t = fuse.search(search).map((result) => result.item);
      setSearchParam("search", search);
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
              value={search}
            />
          </div>
        </div>

        {/* list tools  */}
        {tools?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 p-[0px_24px]">
            {tools.map((m, i) => (
              <ToolItem toolTags={tags} data={m} key={m.name} />
            ))}
          </div>
        ) : (
          <NotFoundTool />
        )}
      </div>
    </AppLayout>
  );
}

const NotFoundTool = () => {
  return (
    <div className="p-4">
      <h2 className="text-center text-xl font-bold mb-4">No Tool Found</h2>
      <p className="mb-4 text">
        Sorry, we couldn't find the tool you're searching for. Let us know what
        you're looking for by filling out{" "}
        <Feedback
          serviceId={"all"}
          type={FeedbackType.request_feature}
          render={
            <button className="text-blue-500 underline">this quick form</button>
          }
        />
        , and we'll consider adding it!
      </p>

      <div className="mt-6 text-center">
        <p className="mb-4">
          Are you a developer or interested in contributing? Help us improve and
          create new tools by contributing to our open-source project on{" "}
          <a
            href="https://github.com/combokitnet/combokitnet"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          !
        </p>

        {/* buttons  */}
        <div className="flex gap-3 items-center justify-center">
          <Feedback
            serviceId={"all"}
            type={FeedbackType.request_feature}
            render={
              <button className="inline-block bg-blue-500 text-white px-4 py-2 rounded">
                <span className="capitalize">This quick form</span>
              </button>
            }
          />
          <a
            href="https://github.com/combokitnet/combokitnet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 text-white px-4 py-2 rounded capitalize"
          >
            Contribute on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};
