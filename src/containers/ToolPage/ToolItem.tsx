import DateFormat from "@/components/DateFormat";
import NoSSR from "@/components/NoSSR";
import useLocalStorage from "@/hooks/useLocalStorage";
import Link from "next/link";
import { useId, useMemo } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { TTool, TToolTag } from "./types";

const ToolItem = ({
  data,
  toolTags,
}: {
  data: TTool;
  toolTags: TToolTag[];
}) => {
  const id = useId();
  const [favorites, setFavorites] = useLocalStorage("_app_favorites", "");

  const isFav = favorites?.includes(data?.name) || false;

  return (
    <div className="flex bg-card h-44 flex-col rounded-lg border bg-card p-3 text-card-foreground hover:bg-muted">
      <div className="relative right-11 mb-[13px] ml-11 flex h-[20px] w-full items-center justify-between">
        <div className="flex gap-1">
          {data?.tags?.map((tag, i) => (
            <button key={`${id}_${i}`}>
              <div
                className="flex h-5 items-center justify-center rounded-sm bg-opacity-10 px-2"
                style={{ backgroundColor: "rgb(245, 243, 255)" }}
              >
                <span className="text-xs" style={{ color: tag.color }}>
                  <span className="line-clamp-1 max-w-[200px]">{tag.name}</span>
                </span>
              </div>
            </button>
          ))}
        </div>

        <div>
          <button
            onClick={() => {
              let list = favorites.length > 0 ? favorites.split(",") : [];
              if (favorites?.includes(data?.name)) {
                list = list.filter((n) => n !== data?.name);
              } else {
                list.push(data?.name);
              }
              setFavorites(list.toString());
            }}
            data-state="closed"
            aria-label="Favorite"
          >
            <NoSSR>
              <ItemFav data={data} favorites={favorites} />
            </NoSSR>
          </button>
        </div>
      </div>
      <div className="flex flex-1 gap-[7px]">
        <div className="icon flex h-9 w-9 min-w-[36px] items-center justify-center overflow-hidden rounded-3xl bg-neutral-100 p-0">
          <img
            alt={data?.name}
            loading="lazy"
            width={36}
            height={36}
            decoding="async"
            data-nimg={1}
            className="3xl rounded"
            src={data?.iconUrl}
            style={{ color: "transparent" }}
          />
        </div>
        <div className="flex w-full flex-col overflow-hidden">
          <div className="group/content flex flex-col pb-3">
            <div className="flex items-center gap-1 pb-1">
              <Link
                className="text-inherit hover:no-underline"
                href={data?.pathUrl || "#"}
              >
                <span className="line-clamp-1 truncate text-sm font-medium leading-tight text-card-primary ease-in-out group-hover/card:text-sky-500 group-hover/content:underline [&>em]:bg-blue-100 [&>em]:font-semibold">
                  {data?.name}
                </span>
              </Link>
            </div>
            <span className="line-clamp-2 h-[32px] text-xs font-normal leading-4 text-card-secondary [&>em]:bg-blue-100 [&>em]:font-semibold">
              {data?.description}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs font-light leading-none text-gray-400 dark:text-gray-500">
            <Link
              className="text-inherit"
              href={`/user/${data?.author?.id}` || "#"}
            >
              <div className="mr-1 max-w-[100px] truncate">
                By {data?.author?.username}
              </div>
            </Link>
            <span className="truncate leading-4">
              Update at <DateFormat date={new Date(data?.updatedAt)} />
            </span>
          </div>

          <div className="mt-auto flex items-center gap-1.5">
            <button data-state="closed" aria-label="Score: 9.9">
              <div className="flex h-6 items-center gap-1.5 rounded border px-1.5 dark:border-gray-600 hover:cursor-help">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-secondary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <div className="text-xs text-secondary false">9.9</div>
              </div>
            </button>

            <button data-state="closed" aria-label="Service Level: 100%">
              <div className="flex h-6 items-center gap-1.5 rounded border px-1.5 dark:border-gray-600 hover:cursor-help">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-secondary"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
                <div className="text-xs text-secondary false">100%</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ItemFav = ({ data, favorites }: { data: TTool; favorites: string }) => {
  const isFav = useMemo(() => {
    return favorites?.includes(data?.name);
  }, [favorites]);

  if (isFav) {
    return <FaHeart className={"text-red-600"} />;
  }

  return <FaRegHeart />;
};

export default ToolItem;
