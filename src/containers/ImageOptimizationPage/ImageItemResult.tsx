import { sizeFormat } from "@/utils/number";
import { maxLength } from "@/utils/string";
import { saveAs } from "file-saver";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { TImages } from "./ImageMain";

export default function ImageItemResult({
  image,
  deleteImage,
}: {
  image: TImages;
  updateImage: (id: string, updatedImage: Partial<TImages>) => void;
  deleteImage: (id: string) => void;
}) {
  return (
    <div className="mb-[12px] w-full grid grid-cols-3 gap-4">
      <div className="flex flex-row gap-2 ">
        <img
          className="w-[50px] h-[50px] object-contain rounded-sm border-gray-400 border-[1px]"
          src={URL.createObjectURL(image?.file)}
          alt={image?.file?.name}
        />

        <div className="flex flex-col">
          <span>{maxLength(image?.file?.name, 22)}</span>
          <span>{image?.file?.type}</span>
        </div>
      </div>

      {image.status === "upload" ? (
        <div className="flex  flex-col items-center">
          <span>{sizeFormat(image?.file?.size)}</span>
        </div>
      ) : image.status === "running" ? (
        <div className="flex  flex-col items-center">
          <span>{sizeFormat(image?.file?.size)}</span>
          <span>optimization...</span>
        </div>
      ) : image.status === "done" && image.output ? (
        <div className="flex flex-col text-center justify-center items-center">
          <div className="flex flex-row items-center gap-2">
            <span>{sizeFormat(image?.file?.size)}</span>
            <FaArrowRight />
            <span>{sizeFormat(image?.output?.sizeAfter || 0)}</span>
          </div>
          <div>
            <span>
              {`- ${sizeFormat(
                image?.output?.sizeBefore - image?.output?.sizeAfter
              )} (${
                100 -
                Math.floor(
                  (image?.output?.sizeAfter * 100) / image?.output?.sizeBefore
                )
              }%)`}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">fail</div>
      )}

      <div className="flex w-full flex-row gap-3 items-center justify-end">
        <button className="flex gap-[6px] h-[32px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
          <MdRemoveRedEye className="text-black-500" size={16} />
        </button>

        <button
          onClick={() => {
            deleteImage(image?.id);
          }}
          className="flex gap-[6px] h-[32px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <RiDeleteBin6Fill className="text-red-500" size={16} />
        </button>

        <button
          onClick={() => {
            saveAs(
              `${image?.output?.baseUrl}/${image?.output?.url}?down=true&filename=${image.file.name}`,
              image?.file?.name
            );
          }}
          className="flex gap-[6px] h-[32px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <FaDownload className="text-green-700" size={16} />
        </button>
      </div>
    </div>
  );
}
