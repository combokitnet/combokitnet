// TODO: share to social + get random desc share from api, navigator.share(data)

import Breadcrumb from "@/components/Breadcrumb";
import { LOCAL_STORAGE } from "@/configs/const";
import useLocalStorage from "@/hooks/useLocalStorage";
import useWindowSize from "@/hooks/useWindowSize";
import { formatLargeNumber } from "@/utils/number";
import { useRouter } from "next/navigation";
import { FaHeart } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { IoEye } from "react-icons/io5";
import { MdFeedback } from "react-icons/md";
import Feedback from "./Feedback";
import ShareSocial from "./ShareSocial";
import { ItemFav } from "./ToolItem";
import { TTool } from "./types";

export default function TitleTool({ data }: { data: TTool }) {
  // favorites, setFavorites
  const { value: favorites, setValue: setFavorites } = useLocalStorage({
    key: LOCAL_STORAGE.TOOLS_FAVORITES,
    defaultValue: "",
  });
  const router = useRouter();
  const { isDesktop } = useWindowSize();

  const onFavorite = () => {
    let list = favorites.length > 0 ? favorites.split(",") : [];
    if (favorites?.includes(data?.name)) {
      list = list.filter((n) => n !== data?.name);
    } else {
      list.push(data?.name);
    }
    setFavorites(list.toString());
  };

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

        {!isDesktop ? (
          <div className="relative p-[24px_0px]">
            <div className="flex flex-col items-start gap-[18px]">
              <div className="flex gap-2 justify-start items-start">
                <img
                  className="w-[50px] h-[50px]"
                  src={data?.iconUrl}
                  alt={data?.name}
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-[24px]">
                    <h2 className="font-medium text-[18px] whitespace-nowrap">
                      {data?.name}
                    </h2>
                    <Feedback
                      serviceId={data?.id}
                      render={
                        <button className="animate-bounce ml-3 whitespace-nowrap rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold leading-6 text-slate-700 lg:block flex flex-row text-[13px] items-center justify-center gap-[2px]">
                          Feedback{" "}
                          <MdFeedback
                            className="animate-bounce"
                            size={"15px"}
                          />
                        </button>
                      }
                    />
                  </div>
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
                </div>
              </div>

              <div className="flex flex-col gap-[3px]">
                <p className="text-[15px]">{data?.description}</p>
                <div className="flex gap-[12px] text-[13px]">
                  <span
                    className="font-medium"
                    title={`author by ${data?.author?.username}`}
                  >
                    by {data?.author?.username}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-end h-full gap-5 mt-2">
              <span
                title={`${data?.rate} rate`}
                className="flex flex-row items-center justify-center gap-[3px] capitalize"
              >
                <span>{data?.rate}</span>
                <GoStarFill size={"15px"} />
              </span>
              <span
                title={`${data?.favoriteCount} likes`}
                className="flex flex-row items-center justify-center gap-[3px] capitalize"
              >
                <span>{formatLargeNumber(data?.favoriteCount)}</span>
                <FaHeart size={"15px"} />{" "}
              </span>
              <span
                title={`${data?.usageCount} used`}
                className="flex flex-row items-center justify-center gap-[3px] capitalize"
              >
                <IoEye size={"15px"} />{" "}
                <span>{formatLargeNumber(data?.usageCount)}</span>
              </span>
              <button
                className="flex gap-[6px] items-center justify-center p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={onFavorite}
                data-state="closed"
                title="Favorite"
              >
                <ItemFav data={data} favorites={favorites} />
              </button>

              <ShareSocial data={data} />
            </div>
          </div>
        ) : (
          <div className="relative p-[24px_0px]">
            <div className="flex items-center gap-[18px]">
              <img
                className="w-[50px] h-[50px]"
                src={data?.iconUrl}
                alt={data?.name}
              />
              <div className="flex flex-col gap-[3px]">
                <div className="flex items-center gap-[24px] ">
                  <h2 className="font-medium text-[18px] whitespace-nowrap">
                    {data?.name}
                  </h2>

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

                  <Feedback
                    serviceId={data?.id}
                    render={
                      <button className=" animate-bounce ml-3 whitespace-nowrap rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-semibold leading-6 text-slate-700 flex flex-row text-[13px] items-center justify-center gap-[2px]">
                        <span>Feedback</span> <MdFeedback size={"15px"} />
                      </button>
                    }
                  />
                </div>
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
                    <span>{data?.rate}</span> <GoStarFill size={"15px"} />
                  </span>
                  <span
                    title={`${data?.favoriteCount} likes`}
                    className="flex flex-row items-center justify-center gap-[3px] capitalize"
                  >
                    <span>{formatLargeNumber(data?.favoriteCount)} </span>
                    <FaHeart size={"15px"} />{" "}
                  </span>
                  <span
                    title={`${data?.usageCount} used`}
                    className="flex flex-row items-center justify-center gap-[3px] capitalize"
                  >
                    <IoEye size={"15px"} />{" "}
                    <span>{formatLargeNumber(data?.usageCount)} </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-0 flex flex-col items-center justify-center h-full gap-[8px]">
              <button
                className="flex gap-[6px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                onClick={onFavorite}
                data-state="closed"
                title="Favorite"
              >
                <ItemFav data={data} favorites={favorites} />
              </button>

              <ShareSocial data={data} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
