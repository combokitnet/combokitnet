// TODO: add copy result
// TODO: add upload with link, url
// TODO: handle with big file (bigger than 15MB)
// TODO: rm all error file
// TODO: show process

import Modal from "@/components/Modal";
import { sizeFormat } from "@/utils/number";
import { maxLength } from "@/utils/string";
import { useState } from "react";
import ReactCompareImage from "react-compare-image";
import { FaArrowRight, FaDownload, FaSpinner } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import { TImages } from "./ImageMain";

export default function ImageItemResult({
  index,
  image,
  deleteImage,
}: {
  index: number;
  image: TImages;
  updateImage: (id: string, updatedImage: Partial<TImages>) => void;
  deleteImage: (id: string) => void;
}) {
  const [modalCompare, setModalCompare] = useState(false);
  return (
    <div className="mb-[12px] w-full grid grid-cols-3 gap-4">
      <div className="flex flex-row gap-2 ">
        <img
          className="w-[50px] h-[50px] object-contain rounded-sm border-gray-400 border-[1px]"
          src={image?.blobUrl}
          alt={image?.file?.name}
        />

        <div title={image?.file?.name} className="flex flex-col">
          <span className="whitespace-nowrap">
            {`${index + 1}. `} {maxLength(image?.file?.name, 22)}
          </span>
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
      ) : image.status === "error" && image.error ? (
        <div className="flex flex-col text-center justify-center items-center">
          <div className="flex flex-row items-center gap-2">
            <span>{sizeFormat(image?.file?.size)}</span>
          </div>
          <div>
            <span>{image?.error?.message}</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center">fail</div>
      )}

      <div className="flex w-full flex-row gap-3 items-center justify-end">
        {image.status === "running" ? (
          <FaSpinner className="animate-spin" />
        ) : (
          ""
        )}

        {image?.status == "done" ? (
          <button
            onClick={() => {
              setModalCompare(true);
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
              deleteImage(image?.id);
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
                `${image?.output?.url}?down=true&filename=${image?.file?.name}`,
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

      <Modal
        isOpen={modalCompare}
        onClose={() => {
          setModalCompare(false);
        }}
        title="Compare Image"
      >
        <div className="max-h-[500px] overflow-auto">
          {/* // TODO: improve modal preview */}
          <ReactCompareImage
            aspectRatio="wider"
            leftImage={URL.createObjectURL(image.file)}
            leftImageLabel={`origin - ${sizeFormat(image.file.size)}`}
            rightImage={image?.output?.url!}
            rightImageLabel={`new - ${sizeFormat(
              image.output?.sizeAfter || 0
            )}`}
            skeleton={<VscLoading color="Background" />}
            rightImageCss={{
              objectFit: "cover",
            }}
            leftImageCss={{
              objectFit: "cover",
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
