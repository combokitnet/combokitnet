// TODO: QR Code Storage, Password in Images, Encrypted File, Audio Representation, Password Phrase Art

"use client";

import { DropDown } from "@/components/DropDown";
import { APP_NAME } from "@/configs/const";
import { useQRCode } from "@/hooks/useQrCode";
import useWindowSize from "@/hooks/useWindowSize";
import { copyToClipboard } from "@/utils/app";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClipboard, FaImages } from "react-icons/fa";
import slugify from "slugify";
import { reverseSpecialCharMap } from "./const";
import { calculateHackTime, mapWordWithSymbol, PasswordType } from "./utils";

const OptionQrCode = ({ password }: { password: string }) => {
  const qr = useQRCode({ width: 120, height: 120 });

  useEffect(() => {
    qr.update({ data: password });
  }, [password]);

  const onDownload = async () => {
    try {
      await qr.qrCode?.download({
        extension: "png",
        name: slugify(`Password Generator by ${APP_NAME}`),
      });
      console.log(`onDownload done`);
    } catch (error) {
      console.log(`onDownload catch`);
    }
  };

  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div onClick={onDownload} ref={qr.ref}></div>
      <button className="text-xs text-blue-400 underline" onClick={onDownload}>
        QRCode download
      </button>
    </div>
  );
};

function generateRandomRGBImage(
  width: number,
  height: number,
  padding: number = 10,
  metadata?: string
) {
  const canvas = document.createElement("canvas");

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.fillStyle = `#fff`;
  ctx.fillRect(0, 0, width, height);

  const imageData = ctx.createImageData(
    width - 2 * padding,
    height - 2 * padding
  );

  for (let i = 0; i < imageData.data.length; i += 4) {
    imageData.data[i] = Math.floor(Math.random() * 256); // Red
    imageData.data[i + 1] = Math.floor(Math.random() * 256); // Green
    imageData.data[i + 2] = Math.floor(Math.random() * 256); // Blue
    imageData.data[i + 3] = 255; // Alpha (fully opaque)
  }

  ctx.putImageData(imageData, padding, padding);

  return canvas.toDataURL("image/png");
}

const OptionImage = ({ password }: { password: string }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const blobUrl = generateRandomRGBImage(120, 120, 5);
    console.log({ blobUrl });
    if (blobUrl) setUrl(blobUrl);
  }, [password]);

  if (!url) return "...";

  return (
    <div className="flex flex-col items-center">
      {url && <img width={120} height={120} src={url} alt="" />}

      <button className="text-xs" onClick={async () => {}}>
        Image download
      </button>
    </div>
  );
};

export default function PasswordGeneratorItem({
  password,
  type,
}: {
  password: string;
  type: PasswordType;
}) {
  const { isDesktop } = useWindowSize();
  const [showImage, setShowImage] = useState(false);

  return (
    <li className="">
      <div className="bg-gray-100 p-2 rounded flex justify-between items-center">
        <span
          onClick={(el) => {
            let range = document.createRange();
            range.selectNodeContents(el?.currentTarget);
            let sel = window.getSelection()!;
            sel.removeAllRanges();
            sel.addRange(range);
          }}
          className="w-full break-all text-center text-[18px] font-bold"
        >
          {password}
        </span>

        {isDesktop ? (
          <div className="flex flex-row gap-3">
            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                await copyToClipboard(password);
                toast.success("Password copied!");
              }}
              className="bg-green-500 text-white select-none flex flex-row items-center px-2 py-1 rounded "
            >
              <FaClipboard className="mr-2" /> Text
            </button>
            <button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                setShowImage((m) => !m);
              }}
              className="bg-green-500 text-white select-none flex flex-row items-center px-2 py-1 rounded "
            >
              <FaImages className="mr-2" /> Image
            </button>
          </div>
        ) : (
          <DropDown
            items={[
              {
                icon: <FaClipboard className="mr-2" />,
                label: "Copy as Text",
                onClick: async () => {
                  await copyToClipboard(password);
                  toast.success("Password copied!");
                },
                render: (item) => (
                  <div className="whitespace-nowrap">{item?.label}</div>
                ),
              },
              {
                icon: <FaImages className="mr-2" />,
                label: "Store inside Image",
                onClick: () => {
                  setShowImage((m) => !m);
                },
                render: (item) => (
                  <div className="whitespace-nowrap">{item?.label}</div>
                ),
              },
            ]}
          >
            <button className="bg-green-500 text-white select-none flex flex-row items-center px-2 py-1 rounded ml-4">
              <FaClipboard className="mr-2" /> Copy
            </button>
          </DropDown>
        )}
      </div>

      {type === "wordsWithSymbols" ? (
        <p className="break-all select-none text-[12px]">
          Origin password:{" "}
          <span className="text-green-600">
            {mapWordWithSymbol(password, reverseSpecialCharMap)}
          </span>
        </p>
      ) : (
        ""
      )}
      <p
        onClick={(e) => {
          e.preventDefault();
          console.log("Estimated");
        }}
        className="break-all  select-none text-[12px]"
      >
        Estimated time to crack:{" "}
        <span className="cursor-pointer hover:text-blue-500">
          {calculateHackTime(password)}
        </span>
        , length: {password.length}
      </p>

      <div
        className="flex flex-row justify-center items-center gap-3"
        style={{
          display: showImage ? "flex" : "none",
        }}
      >
        <OptionQrCode password={password} />
        {/* <OptionImage password={password} /> */}
      </div>
    </li>
  );
}
