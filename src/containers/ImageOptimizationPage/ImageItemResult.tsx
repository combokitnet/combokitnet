// TODO: add copy result
// TODO: add upload with link, url
// TODO: handle with big file (bigger than 15MB)
// TODO: btn delete: rm all error file, rm no change file size, rm all
// TODO: btn cancel

import useWindowSize from "@/hooks/useWindowSize";
import { sizeFormat } from "@/utils/number";
import { maxLength } from "@/utils/string";
import { Dispatch, SetStateAction } from "react";
import { FaArrowRight, FaDownload, FaSpinner } from "react-icons/fa";
import { IoReloadCircle } from "react-icons/io5";
import { MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TImages } from "./ImageMain";
import { reNameFile } from "./utils";

export default function ImageItemResult({
  index,
  image,
  deleteImage,
  updateImage,
  nameFormats,
  setModalCompare,
}: {
  index: number;
  image: TImages;
  updateImage: (id: string, updatedImage: Partial<TImages>) => void;
  deleteImage: (id: string[]) => void;
  nameFormats: string[];
  setModalCompare: Dispatch<SetStateAction<TImages | undefined>>;
}) {
  const { isDesktop } = useWindowSize();

  return (
    <div className="mb-[12px] grid w-full grid-cols-3 gap-6">
      <div className="flex flex-row gap-2">
        <img
          className="w-[50px] h-[50px] object-contain rounded-sm border-gray-400 border-[1px]"
          src={image?.blobUrl}
          alt={image?.file?.name}
        />

        <div title={image?.file?.name} className="flex flex-col">
          <span className="whitespace-nowrap">
            {`${index + 1}. `}{" "}
            {maxLength(image?.file?.name, isDesktop ? 42 : 10, "start")}
          </span>
          <span>{image?.file?.type}</span>
        </div>
      </div>

      <div className="flex flex-col items-center text-center justify-center">
        {image.status === "done" && image.output ? (
          ""
        ) : (
          <span>{sizeFormat(image?.file?.size)}</span>
        )}

        {(() => {
          if (image.status === "upload") {
            return <span>Uploading...</span>;
          }

          if (image.status === "running") {
            return <span>Optimization...</span>;
          }

          if (image.status === "done" && image.output) {
            return (
              <>
                <div className="flex flex-row items-center gap-2">
                  <span>{sizeFormat(image?.file?.size)}</span>
                  <FaArrowRight />
                  <span>{sizeFormat(image?.output?.sizeAfter || 0)}</span>
                </div>
                <span>
                  {`- ${sizeFormat(
                    image?.output?.sizeBefore - image?.output?.sizeAfter
                  )} (${
                    100 -
                    Math.floor(
                      (image?.output?.sizeAfter * 100) /
                        image?.output?.sizeBefore
                    )
                  }%)`}
                </span>
              </>
            );
          }

          return (
            <span className="flex flex-row gap-3 items-center justify-center">
              <span className="text-red-500">
                {image?.error?.message || "Failed"}
              </span>
              <button
                disabled={image?.retryCount >= 3}
                onClick={() => {
                  updateImage(image?.id, {
                    status: "upload",
                    retryCount: image.retryCount + 1,
                  });
                }}
                type="button"
                className="text-blue-600 flex flex-row gap-1 items-center justify-center disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <IoReloadCircle size={28} />
                Retry {image.retryCount}
              </button>
            </span>
          );
        })()}
      </div>

      <div className="flex w-full flex-row gap-3 items-center justify-end">
        {image.status === "running" ? (
          <FaSpinner className="animate-spin" />
        ) : (
          ""
        )}

        {image?.status == "done" ? (
          <button
            onClick={() => {
              setModalCompare(image);
            }}
            className="flex gap-[6px] h-[32px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <MdRemoveRedEye className="text-black-500" size={16} />
          </button>
        ) : (
          ""
        )}

        {image?.status === "done" ||
        image?.status === "error" ||
        image.status === "cancel" ? (
          <button
            onClick={() => {
              URL.revokeObjectURL(image.blobUrl);
              deleteImage([image?.id]);
            }}
            className="flex gap-[6px] h-[32px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <RiDeleteBin6Fill className="text-red-500" size={16} />
          </button>
        ) : (
          ""
        )}

        {image?.status == "done" ? (
          <button
            onClick={async () => {
              window.open(
                `${image?.output?.url}?down=true&filename=${reNameFile(
                  image?.file,
                  nameFormats
                )}`,
                "__blank"
              );
            }}
            className="flex gap-[6px] h-[32px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <FaDownload className="text-green-700" size={16} />
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
