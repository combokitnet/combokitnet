// TODO: share to social + get random desc share from api
// TODO: feedback form

import Breadcrumb from "@/components/Breadcrumb";
import { LOCAL_STORAGE } from "@/configs/const";
import useLocalStorage from "@/hooks/useLocalStorage";
import { formatLargeNumber } from "@/utils/number";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import Feedback from "./Feedback";
import ShareSocial from "./ShareSocial";
import { ItemFav } from "./ToolItem";
import { TTool } from "./types";

export default function TitleTool({ data }: { data: TTool }) {
  const [favorites, setFavorites] = useLocalStorage(
    LOCAL_STORAGE.TOOLS_FAVORITES,
    ""
  );
  const router = useRouter();
  return (
    <div>
      <div className="pt-[80px]"></div>
      <div id="tool_head" className="container mx-auto p-3">
        <div>
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: data?.name, href: "#" },
            ]}
          />
        </div>

        <div className="relative p-[24px_0px]">
          <div className="flex items-center gap-[18px]">
            <img
              className="w-[50px] h-[50px]"
              src={data?.iconUrl}
              alt={data?.name}
            />
            <div className="flex flex-col gap-[3px]">
              <h2 className="font-medium text-[18px] flex items-center gap-[24px]">
                {data?.name}

                <ul className="flex gap-[5px]">
                  {data?.tags?.map((tag) => (
                    <li
                      key={tag?.id + tag.name}
                      onClick={() => {
                        router.push(`/tools?tag=${tag.name}`, {
                          scroll: true,
                        });
                      }}
                      className="text-[12px] p-[0_6px] rounded-[12px] cursor-pointer"
                      style={{ color: tag.color, background: "#def4ff" }}
                    >
                      {tag.name}
                    </li>
                  ))}
                </ul>
              </h2>
              <p className="text-[15px]">{data?.description}</p>
              <div className="flex gap-[12px] text-[13px]">
                <span
                  className="font-medium"
                  title={`author by ${data?.author?.username}`}
                >
                  by {data?.author?.username}
                </span>
                <span
                  title={`${data?.rate} rate`}
                  className="flex flex-row items-center justify-center gap-[3px] capitalize"
                >
                  <GoStarFill size={"15px"} /> <span>{data?.rate}</span>
                </span>
                <span
                  title={`${data?.favoriteCount} likes`}
                  className="flex flex-row items-center justify-center gap-[3px] capitalize"
                >
                  <FaHeart size={"15px"} />{" "}
                  <span>{formatLargeNumber(data?.favoriteCount)} like</span>
                </span>
                <span
                  title={`${data?.usageCount} used`}
                  className="flex flex-row items-center justify-center gap-[3px] capitalize"
                >
                  <IoEye size={"15px"} />{" "}
                  <span>{formatLargeNumber(data?.usageCount)} used</span>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute right-0 top-0 flex flex-col items-center justify-center h-full gap-[8px]">
            <button
              className="flex gap-[6px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
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
              title="Favorite"
            >
              <ItemFav data={data} favorites={favorites} />
            </button>

            <Feedback />
            <ShareSocial data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
