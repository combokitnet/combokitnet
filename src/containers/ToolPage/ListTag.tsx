import { TToolTag } from "./types";

export default function ListTag({
  toolTags,
  tag,
  setTag,
  setSearchParam,
}: {
  toolTags: TToolTag[];
  tag: string[];
  setTag: any;
  setSearchParam: any;
}) {
  return (
    <div className="flex gap-[8px] flex-wrap">
      {toolTags.map((m) => {
        let isSelected = tag?.includes(m.name);
        return (
          <div
            key={m.slug}
            onClick={() => {
              let n = [];
              if (tag?.includes(m.name)) {
                n = tag.filter((k) => k !== m.name);
              } else {
                n = [...tag];
                n.push(m.name);
              }
              setTag(n);
              setSearchParam("tag", n.toString());
            }}
            className="flex gap-1 cursor-pointer"
          >
            <button>
              <div
                className={`flex h-8 items-center justify-center rounded-lg px-2 ${
                  isSelected
                    ? "bg-slate-900 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                <span className="text-md">
                  <span className="line-clamp-1 max-w-[200px]">{m.name}</span>
                </span>
              </div>
            </button>
            <div className="flex flex-wrap items-center gap-1" />
          </div>
        );
      })}
    </div>
  );
}
