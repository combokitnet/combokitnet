import InputSelect from "@/components/InputSelect";
import { LOCAL_STORAGE } from "@/configs/const";
import useLocalStorage from "@/hooks/useLocalStorage";
import useWindowSize from "@/hooks/useWindowSize";
import { PropsWithChildren, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { passwordConfigs, PasswordType } from "./utils";

interface FileNameFormatProps extends PropsWithChildren {
  setType: React.Dispatch<React.SetStateAction<PasswordType>>;
  setLength: React.Dispatch<React.SetStateAction<number>>;
  type: PasswordType;
}

export const PW_OPTIONS = {
  key: LOCAL_STORAGE.PASSWORD_TYPE,
  defaultValue: "wordsWithSymbols",
};

const PasswordTypePick = ({
  setLength,
  setType,
  type,
}: FileNameFormatProps) => {
  const { isMobile } = useWindowSize();
  const { setValue, oldValue } = useLocalStorage<string>(PW_OPTIONS);

  useEffect(() => {
    if (oldValue && passwordConfigs[oldValue as PasswordType]) {
      setType(oldValue as PasswordType);
      setLength(passwordConfigs[oldValue as PasswordType].minLength);
    }
  }, [oldValue]);

  return (
    <>
      <InputSelect
        defaultValue={type ? [type] : undefined}
        items={Object?.entries(passwordConfigs).map(([key, m]) => ({
          label: m?.name,
          value: key,
          render(_, selected) {
            return (
              <div className="flex flex-col w-full items-start relative pr-[17px]">
                <span className="text-sm whitespace-nowrap text-gray-800 font-semibold">
                  {m?.name}
                </span>

                {!isMobile && (
                  <span className="text-xs whitespace-nowrap text-gray-500">
                    {m?.description}
                  </span>
                )}

                {selected?.includes(key) && (
                  <FaCheck className="absolute right-[-3px] top-[50%] translate-y-[-50%]" />
                )}
              </div>
            );
          },
        }))}
        title="Format"
        showTitle
        onChange={(selected) => {
          console.log("onChange", selected);
          if (selected?.length > 0) {
            let type = selected[0] as PasswordType;
            setType(type);
            setLength(passwordConfigs[type].minLength);
            setValue(type);
          }
        }}
      />

      {/* <button
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="capitalize  bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex justify-center gap-3 items-center p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[50%] max-w-[200px]"
        type="button"
      >
        {passwordConfigs[type]?.name}
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Password Type"
      >
        <div className="mb-4 w-full flex flex-col sm:flex-row gap-3 items-center">
          <label htmlFor="select-password-type">Password Type</label>
          <select
            id="select-password-type"
            className="bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[50%] max-w-[200px]"
            defaultValue={type}
            onChange={(e) => {
              setType(e.target.value as PasswordType);
              setLength(
                passwordConfigs[e.target.value as PasswordType].minLength
              );
              setValue(e.target.value);
            }}
          >
            <option value="" disabled>
              Select Password Type
            </option>
            {mapPasswordConfig.map((m: PasswordType, i: number) => (
              <option key={`${m}_${i}`} value={m}>
                {passwordConfigs[m].name}
              </option>
            ))}
          </select>
        </div>

        <PasswordTypeDesc type={type} />
      </Modal> */}
    </>
  );
};

export default PasswordTypePick;
