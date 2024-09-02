import { sizeFormat } from "@/utils/number";
import { delay, timeFormat } from "@/utils/time";
import axios from "axios";
import JSZip from "jszip";
import { useMemo, useRef, useState } from "react";
import { FaArrowDown, FaArrowUp, FaDownload, FaSpinner } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";
import { TImages } from "./ImageMain";

// Assuming internet speed is 10 Mbps
const internetSpeedMbps = 10;
const bytesPerMegabit = 125000; // 1 megabit = 125,000 bytes

export default function ImageStats({
  images,
  total,
  totalError,
  totalSuccess,
}: {
  images: {
    [key: string]: TImages;
  };
  total: number;
  totalError: number;
  totalSuccess: number;
}) {
  const {
    totalSizeBefore,
    totalSizeAfter,
    totalOptimizationTime,
    averageSizeReduction,
    estimatedFasterLoadTime,
  } = useMemo(() => {
    let data = Object.values(images) || [];

    let totalSizeBefore = 0;
    let totalSizeAfter = 0;
    let totalOptimizationTime = 0;
    let totalSizeReduction = 0;

    for (const item of data) {
      const sizeBefore = item?.output?.sizeBefore ?? 0;
      const sizeAfter = item?.output?.sizeAfter ?? 0;
      const time = item?.output?.time ?? 0;

      totalSizeBefore += sizeBefore;
      totalSizeAfter += sizeAfter;
      totalOptimizationTime += time;
      totalSizeReduction += sizeBefore - sizeAfter;
    }

    const averageSizeReduction = totalSizeBefore
      ? (totalSizeReduction / totalSizeBefore) * 100
      : 0;

    const totalSizeReductionMb = totalSizeReduction / bytesPerMegabit;
    const estimatedFasterLoadTime = Math.ceil(
      (totalSizeReductionMb * 1000) / internetSpeedMbps
    );

    return {
      totalSizeBefore,
      totalSizeAfter,
      totalOptimizationTime,
      averageSizeReduction: Math.ceil(averageSizeReduction),
      estimatedFasterLoadTime,
    };
  }, [images]);

  if (Object.keys(images).length < 1) return <div></div>;

  return (
    <div>
      {/* stats list */}
      <div className="mt-3 mb-3 rounded-lg col-span-12 p-[12px] border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          <div className="flex text-center items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
            <div>
              <h4 className="mb-0.5 text-xl font-semibold text-black dark:text-white md:text-title-lg">
                {sizeFormat(totalSizeBefore) || 0}
              </h4>
              <p className="text-sm font-medium">Size Before</p>
            </div>
          </div>

          <div className="flex text-center items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
            <div>
              <h4 className="mb-0.5 text-xl font-semibold text-black dark:text-white md:text-title-lg">
                {sizeFormat(totalSizeAfter) || 0}
              </h4>
              <p className="text-sm font-medium">Size After</p>
            </div>
            <div className="flex items-center gap-1">
              <FaArrowDown color="green" />
              <span className="text-meta-3">{averageSizeReduction}%</span>
            </div>
          </div>

          <div className="flex items-center text-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark sm:border-b-0 sm:pb-0 xl:border-r">
            <div>
              <h4 className="gap-[3px] flex flex-row justify-evenly mb-0.5 text-xl font-semibold text-black dark:text-white md:text-title-lg">
                <span>{totalError}</span> / <span>{totalSuccess}</span> /{" "}
                <span>{total}</span>
              </h4>
              <p className="gap-[3px] flex flex-row justify-evenly text-sm font-medium">
                <span>Error</span> / <span>Success</span> / <span>Total</span>
              </p>
            </div>
          </div>

          <div className="flex text-center items-center justify-center gap-2">
            <div>
              <h4 className="mb-0.5 flex items-center gap-2 justify-center text-xl font-semibold text-black dark:text-white md:text-title-lg">
                <FaArrowUp color="green" />
                {timeFormat(estimatedFasterLoadTime)}
              </h4>
              <p className="text-sm font-medium">Faster Load Time</p>
            </div>
          </div>
        </div>
      </div>

      {/* actions  */}
      <div className="flex justify-center gap-3 w-full mb-3">
        <button
          onClick={() => {
            // TODO: ask cf and delete all
          }}
          type="button"
          className="capitalize gap-1 text-white bg-[#ea3b3b] hover:bg-[#ea3b3b]/80 focus:ring-4 focus:outline-none focus:ring-[#ea3b3b]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#ea3b3b]/80 dark:focus:ring-[#ea3b3b]/40 me-2 mb-2"
        >
          <IoMdRemoveCircle />
          delete all
        </button>
        <BtnDownloadAll images={images} total={total} />
      </div>
    </div>
  );
}

const BtnDownloadAll = ({
  images,
  total,
}: {
  images: {
    [key: string]: TImages;
  };
  total: number;
}) => {
  const [isDownload, setIsDownload] = useState(false);
  const [_, setRefesh] = useState(false);
  const downloadCount = useRef(0);

  return (
    <button
      disabled={isDownload}
      onClick={async () => {
        setIsDownload(true);
        downloadCount.current = 0;

        const zip = new JSZip();
        const arrs = Object.values(images);
        for (let index = 0; index < arrs.length; index++) {
          const u = arrs[index];
          try {
            if (u.status == "done") {
              const blob = await axios.get(`${u?.output?.url}`, {
                responseType: "blob",
              });
              zip.file(u.file.name, blob.data);
              downloadCount.current += 1;
              setRefesh((m) => !m);
              await delay(1);
            }
          } catch (error) {
            console.error("error zip", u?.output?.url);
          }
        }

        zip.generateAsync({ type: "blob" }).then((content) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(content);
          link.download = `combokitnet_image-optimization_${Date.now()}.zip`;
          link.click();
        });

        setIsDownload(false);
      }}
      type="button"
      className="capitalize gap-1 text-white bg-[#1c941c] hover:bg-[#1c941c]/80 focus:ring-4 focus:outline-none focus:ring-[#1c941c]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#1c941c]/80 dark:focus:ring-[#1c941c]/40 me-2 mb-2"
    >
      {isDownload ? <FaSpinner className="animate-spin" /> : <FaDownload />}
      download
      {isDownload ? `(${downloadCount.current}/${total})` : ""}
    </button>
  );
};
