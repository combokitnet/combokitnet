import Modal from "@/components/Modal";
import { TImages } from "./ImageMain";

import { sizeFormat } from "@/utils/number";
import ReactCompareImage from "react-compare-image";
import { VscLoading } from "react-icons/vsc";

export default function ImageViewer({
  image,
  onClose,
}: {
  image: TImages;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={!!image?.id} onClose={onClose} title="Image Viewer">
      <div className="resize p-[32px] border">
        <div className="overflow-auto h-full w-full max-h-[500px]">
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
      </div>
    </Modal>
  );
}
