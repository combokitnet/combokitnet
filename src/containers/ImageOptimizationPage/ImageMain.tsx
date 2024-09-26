// TODO: add sample try: file, folder, url
// TODO: add copy image
// TODO: get image info like: meta data comment, author,...
// TODO: add watermark: text, image

import useSearchParams from "@/hooks/useSearchParams";
import { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
import FileNameFormat from "./FileNameFormat";
import ImageItemResult from "./ImageItemResult";
import ImageStats from "./ImageStats";
import useImageUpload from "./useImageUpload";

export enum TInputType {
  FILE = "FILES",
  FOLDER = "FOLDER",
  URL = "URL",
}

const isTInputType = (value: any): value is TInputType => {
  return Object.values(TInputType).includes(value);
};

export interface TImages {
  timestamp: number;
  id: string;
  blobUrl: string;
  file: File;
  output?: {
    url: string;
    fileName: string;
    ext: string;
    mime: string;
    sizeBefore: number;
    sizeAfter: number;
    sizeUnit: string;
    time: number;
    timeUnit: string;
  };
  status: "upload" | "running" | "done" | "cancel" | "error" | "delete";
  error?: {
    errorCode: string;
    message: string;
  };
}

const MAX_FILES = 100;

export default function Main() {
  const { setSearchParam, initSearchParams } = useSearchParams();
  const [inputType, setInputType] = useState(TInputType.FILE);
  const {
    images,
    addImages,
    updateImage,
    deleteImage,
    total,
    totalError,
    totalSuccess,
  } = useImageUpload();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (!file) return;
          const blobUrl = URL.createObjectURL(file);
          addImages([
            {
              id: uuidv4(),
              file: file,
              status: "upload",
              timestamp: Date.now(),
              blobUrl,
            },
          ]);
        }
      }
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  useEffect(() => {
    if (initSearchParams.size > 0) {
      let inputType = initSearchParams.get("inputType");
      if (isTInputType(inputType)) {
        setInputType(inputType);
      }
    }
  }, [initSearchParams]);

  return (
    <div className="container mx-auto">
      {/* <p className="break-words">{JSON.stringify(selectedOptions)}</p> */}

      <div className="flex gap-3 justify-end mb-1">
        <FileNameFormat setMainSelectedOptions={setSelectedOptions} />

        <select
          id="inputType"
          className="bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[50%] max-w-[200px]"
          value={inputType}
          onChange={(e) => {
            setInputType(e?.target?.value as any);
            setSearchParam("inputType", e?.target?.value);
          }}
        >
          <option value={TInputType.FILE}>Upload files</option>
          <option value={TInputType.FOLDER}>Upload folder</option>
          <option value={TInputType.URL}>Upload from Link, URL</option>
        </select>
      </div>

      <div className="flex items-center justify-center w-full">
        {inputType == TInputType.FOLDER ? (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FiUploadCloud size={32} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Select an folder</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, GIF, JPEG, WebP
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max {MAX_FILES} files one time
              </p>
            </div>
            <input
              id="dropzone-file"
              onChange={(e) => {
                console.log(e.target.files);
                if (!e.target.files) {
                  return;
                }
                let list: TImages[] = [];
                for (let index = 0; index < e?.target?.files.length; index++) {
                  const file = e?.target?.files[index];
                  if (file.type?.includes("image")) {
                    list.push({
                      id: uuidv4(),
                      file: file,
                      status: "upload",
                      timestamp: Date.now(),
                      blobUrl: URL.createObjectURL(file),
                    });
                  }
                }
                addImages(list);
              }}
              type="file"
              className="hidden"
              accept=".svg,.png,.jpg,.jpeg,.gif,.webp"
              multiple
              // @ts-ignore
              webkitdirectory={""}
              mozdirectory={true}
              directory={true}
              max={MAX_FILES}
            />
          </label>
        ) : (
          ""
        )}

        {inputType == TInputType.FILE ? (
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <FiUploadCloud size={32} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Upload, Drag Drop, Paste image here
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG, GIF, JPEG, WebP
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Max {MAX_FILES} files one time
              </p>
            </div>
            <input
              id="dropzone-file"
              onChange={(e) => {
                console.log(e.target.files);
                if (!e.target.files) {
                  return;
                }
                let list: TImages[] = [];
                for (let index = 0; index < e?.target?.files.length; index++) {
                  const file = e?.target?.files[index];
                  if (file.type?.includes("image")) {
                    list.push({
                      id: uuidv4(),
                      file: file,
                      status: "upload",
                      timestamp: Date.now(),
                      blobUrl: URL.createObjectURL(file),
                    });
                  }
                }
                addImages(list);
              }}
              type="file"
              className="hidden"
              accept=".svg,.png,.jpg,.jpeg,.gif,.webp"
              multiple
              // webkitdirectory={""}
              // mozdirectory={true}
              // directory={true}
              max={MAX_FILES}
            />
          </label>
        ) : (
          ""
        )}

        {inputType == TInputType.URL ? (
          <textarea
            onChange={(e) => {
              console.log(e.target.value);
              // TODO: handle for text input
            }}
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Insert links here..."
            defaultValue={""}
          />
        ) : (
          ""
        )}
      </div>

      <ImageStats
        images={images}
        total={total}
        totalError={totalError}
        totalSuccess={totalSuccess}
      />

      {Object.values(images)
        .sort((a, b) => b.timestamp - a.timestamp)
        .map((item, index) => (
          <ImageItemResult
            index={total - index - 1}
            key={item?.id}
            image={item}
            updateImage={updateImage}
            deleteImage={deleteImage}
            nameFormats={selectedOptions}
          />
        ))}
    </div>
  );
}
