import Modal from "@/components/Modal";
import { LOCAL_STORAGE } from "@/configs/const";
import useLocalStorage from "@/hooks/useLocalStorage";
import { maxLength } from "@/utils/string";
import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  conflictResolution,
  FileNameType,
  fileNameTypes,
  reNameFile,
} from "./utils";

interface FileNameFormatProps extends PropsWithChildren {
  setMainSelectedOptions: (data: any) => void;
}

export const IMAGE_FILENAME_OPTIONS = {
  key: LOCAL_STORAGE.IMAGE_FILENAME_OPTIONS,
  defaultValue: [],
  decodeFunc: (value: string) => {
    return value?.split(",");
  },
  encodeFunc: (value: string[]) => {
    return value.join(",");
  },
};

const FileNameFormat = ({ setMainSelectedOptions }: FileNameFormatProps) => {
  const { setValue: setLocalData, oldValue } = useLocalStorage<string[]>(
    IMAGE_FILENAME_OPTIONS
  );

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [originalFileName, setOriginalFileName] = useState(
    "123 ?? example image.jpg"
  );

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSelectedOptions((prev) => {
      const updatedOptions = new Set(prev);
      if (updatedOptions.has(value)) {
        updatedOptions.delete(value);
      } else {
        updatedOptions.add(value);
      }
      return Array.from(updatedOptions).sort();
    });
  };

  const isOptionDisabled = (option: string) => {
    if (selectedOptions?.includes("no_change") && option !== "no_change") {
      return true;
    }

    if (selectedOptions.includes(option)) return false;

    return Object.entries(conflictResolution).some(
      ([key, conflicts]) =>
        option === key &&
        selectedOptions.some((selected) => conflicts.includes(selected))
    );
  };

  useEffect(() => {
    if (oldValue) {
      setMainSelectedOptions(oldValue);
      setSelectedOptions(oldValue);
    }
  }, [oldValue]);

  useEffect(() => {
    setMainSelectedOptions(selectedOptions);

    if (selectedOptions.length > 0) {
      setLocalData(selectedOptions);
    }
  }, [selectedOptions]);

  const selectReals = selectedOptions.filter((m) => m !== "no_change");
  const selectName = selectReals.map((m) => m.split("_").join(" ")).join(", ");

  return (
    <>
      <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="capitalize bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[50%] max-w-[200px]"
        type="button"
        title={selectName}
      >
        {selectReals.length > 0
          ? `${maxLength(selectName, 25, "end")}`
          : "Custom Name"}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customize the Output File Name"
      >
        <div className="mb-4">
          <label
            htmlFor="originalFileName"
            className="block font-semibold mb-2"
          >
            Original File Name:
          </label>
          <input
            type="text"
            id="originalFileName"
            value={originalFileName}
            onChange={(e) => setOriginalFileName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          />
        </div>

        <div>
          <h3 className="font-semibold">Formatted File Name:</h3>
          <p className="text-gray-700 break-words">
            <input
              type="text"
              disabled
              value={reNameFile(
                new File([], originalFileName),
                selectedOptions
              )}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </p>
        </div>
        <br />
        <div className="mb-4">
          <label className="block font-semibold mb-2">
            Select Format Options:
          </label>
          <div className="flex flex-col">
            {fileNameTypes.map((item: FileNameType) => {
              const isDisable = isOptionDisabled(item.key);
              return (
                <label
                  key={item.key}
                  className={`flex flex-col ${
                    isDisable ? "text-gray-400" : ""
                  } mb-3`}
                >
                  <p className="font-bold">
                    <input
                      type="checkbox"
                      value={item.key}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                      disabled={isDisable}
                      checked={selectedOptions?.includes(item?.key)}
                    />{" "}
                    {item.name}
                  </p>
                  <p>{item.desc}</p>
                </label>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FileNameFormat;
