import { sizeFormat } from "@/utils/number";
import { timeFormat } from "@/utils/time";
import JSZip from "jszip";
import { useMemo } from "react";
import { FaArrowDown, FaArrowUp, FaDownload } from "react-icons/fa";
import { IoMdRemoveCircle } from "react-icons/io";
import { TImages } from "./ImageMain";

// Assuming internet speed is 10 Mbps
const internetSpeedMbps = 10;
const bytesPerMegabit = 125000; // 1 megabit = 125,000 bytes

export default function ImageStats({
  images,
}: {
  images: {
    [key: string]: TImages;
  };
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
                {sizeFormat(totalSizeBefore)}
              </h4>
              <p className="text-sm font-medium">Size Before</p>
            </div>
          </div>

          <div className="flex text-center items-center justify-center gap-2 border-b border-stroke pb-5 dark:border-strokedark xl:border-b-0 xl:border-r xl:pb-0">
            <div>
              <h4 className="mb-0.5 text-xl font-semibold text-black dark:text-white md:text-title-lg">
                {sizeFormat(totalSizeAfter)}
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
              <h4 className="mb-0.5 text-xl font-semibold text-black dark:text-white md:text-title-lg">
                {timeFormat(totalOptimizationTime)}
              </h4>
              <p className="text-sm font-medium">Optimization Time</p>
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
            // TODO: delete all
          }}
          type="button"
          className="capitalize gap-1 text-white bg-[#ea3b3b] hover:bg-[#ea3b3b]/80 focus:ring-4 focus:outline-none focus:ring-[#ea3b3b]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#ea3b3b]/80 dark:focus:ring-[#ea3b3b]/40 me-2 mb-2"
        >
          <IoMdRemoveCircle />
          delete all
        </button>
        <button
          onClick={async () => {
            const zip = new JSZip();
            await Promise.all(
              Object.values(images).map(async (u) => {
                try {
                  if (u.status == "done") {
                    const response = await fetch(`${u?.output?.url}`);
                    const blob = await response.blob();
                    zip.file(u.file.name, blob);
                  }
                } catch (error) {}
              })
            );

            zip.generateAsync({ type: "blob" }).then((content) => {
              const link = document.createElement("a");
              link.href = URL.createObjectURL(content);
              link.download = `combokitnet_image-optimization_${Date.now()}.zip`;
              link.click();
            });
          }}
          type="button"
          className="capitalize gap-1 text-white bg-[#1c941c] hover:bg-[#1c941c]/80 focus:ring-4 focus:outline-none focus:ring-[#1c941c]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#1c941c]/80 dark:focus:ring-[#1c941c]/40 me-2 mb-2"
        >
          <FaDownload />
          download all (
          {Object.values(images).filter((m) => m.status === "done").length})
        </button>
      </div>
    </div>
  );
}
