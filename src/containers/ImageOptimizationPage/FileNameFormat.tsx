import Modal from "@/components/Modal";
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

const FileNameFormat = ({ setMainSelectedOptions }: FileNameFormatProps) => {
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
    setMainSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  const selectReals = selectedOptions.filter((m) => m !== "no_change");
  return (
    <>
      <button
        className=""
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Custom Name {selectReals.length > 0 ? `(${selectReals.length})` : ""}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Customize the Output File Name"
      >
        <div className="mb-4">
          <label htmlFor="originalFileName" className="block mb-2">
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
            {reNameFile(new File([], originalFileName), selectedOptions)}
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
                  className={`flex items-center ${
                    isDisable ? "text-gray-400" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    value={item.key}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                    disabled={isDisable}
                  />
                  <span className="font-bold">{item.name}</span>: {item.desc}
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
