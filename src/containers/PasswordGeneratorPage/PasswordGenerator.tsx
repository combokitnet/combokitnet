import { copyToClipboard } from "@/utils/app";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClipboard, FaKey } from "react-icons/fa";
import { lowercase, numbers, symbols, uppercase } from "./const";
import PasswordGeneratorItem from "./PasswordGeneratorItem";
import PasswordTypePick from "./PasswordType";
import { generatePassword, passwordConfigs, PasswordType } from "./utils";

const PasswordGeneratorDefaultKey: PasswordType = "wordsWithSymbols";
const PasswordGeneratorDefault = passwordConfigs[PasswordGeneratorDefaultKey];

const PasswordGenerator: React.FC = () => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [length, setLength] = useState<number>(
    PasswordGeneratorDefault?.minLength
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [type, setType] = useState<PasswordType>(PasswordGeneratorDefaultKey);

  const [charset, setCharset] = useState<string>(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );

  const [splitChar, setSplitChar] = useState<string>("-");

  const onGeneratePassword = () => {
    const generatedPasswords = Array.from({ length: quantity }, () => {
      return generatePassword({
        length: length,
        includeLowercase,
        includeUppercase,
        includeNumber: includeNumbers,
        includeSymbol: includeSymbols,
        type,
        splitChar,
        customCharset: charset,
      });
    });

    setPasswords(generatedPasswords);
  };

  useEffect(() => {
    let c = "";
    if (includeLowercase) c += lowercase;
    if (includeUppercase) c += uppercase;
    if (includeNumbers) c += numbers;
    if (includeSymbols) c += symbols;

    if (!c.length) {
      c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    setCharset(c);
  }, [includeLowercase, includeNumbers, includeSymbols, includeUppercase]);

  useEffect(() => {
    onGeneratePassword();
  }, [length, quantity, charset, type, splitChar]);

  return (
    <div className="container mx-auto p-4 max-w-[1200px]">
      <div className="mb-4 flex gap-3 justify-end">
        <PasswordTypePick setType={setType} setLength={setLength} type={type} />

        <select
          className="flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-1 shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 h-7 text-xs"
          defaultValue={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {Array(25)
            .fill(0)
            .map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1} times
              </option>
            ))}
        </select>
      </div>

      {type === "normal" ? (
        <div className="mb-4">
          <label className="block ">
            Charset <span className="text-xs">(Allow only this chars)</span>
          </label>
          <textarea
            value={charset}
            onChange={(e) => setCharset(e.target.value)}
            className="w-full block p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
          />
        </div>
      ) : (
        ""
      )}

      {passwords.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-5">
            {passwords.map((password, index) => (
              <PasswordGeneratorItem
                key={index}
                password={password}
                type={type}
              />
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 select-none">
        <p className="font-semibold">Additional Options</p>
        <div className="p-5">
          <div className="mb-4">
            <label className="block ">
              {passwordConfigs[type]?.typeCount === "char"
                ? "Password Length"
                : "Word Count"}
              :
              <input
                type="number"
                min={passwordConfigs[type]?.minLength}
                value={length}
                onChange={(e) => {
                  if (+e.target.value < passwordConfigs[type]?.minLength) {
                    return;
                  }

                  setLength(+e.target.value);
                }}
                className="mr-2 ml-2 w-[45px] text-center rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
              />
            </label>

            <input
              type="range"
              min={passwordConfigs[type]?.typeCount === "char" ? 4 : 2}
              max={passwordConfigs[type]?.typeCount === "char" ? 64 : 24}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          <div className="flex gap-5 flex-wrap mb-4">
            {passwordConfigs[type]?.canCustomize?.lowerCase && (
              <div className="">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeLowercase}
                    onChange={() => setIncludeLowercase(!includeLowercase)}
                    className="mr-2"
                  />
                  lowercase
                </label>
              </div>
            )}

            {passwordConfigs[type]?.canCustomize?.upperCase && (
              <div className="">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeUppercase}
                    onChange={() => setIncludeUppercase(!includeUppercase)}
                    className="mr-2"
                  />
                  UPPERCASE
                </label>
              </div>
            )}

            {passwordConfigs[type]?.canCustomize?.numbers && (
              <div className="">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={() => setIncludeNumbers(!includeNumbers)}
                    className="mr-2"
                  />
                  Numbers
                </label>
              </div>
            )}

            {passwordConfigs[type]?.canCustomize?.symbols && (
              <div className="">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={() => setIncludeSymbols(!includeSymbols)}
                    className="mr-2"
                  />
                  Symbols
                </label>
              </div>
            )}

            {passwordConfigs[type]?.typeCount == "word" && (
              <div className="">
                <label className="flex items-center gap-2">
                  <span>Split Char</span>
                  <input
                    type="text"
                    value={splitChar}
                    onChange={(e) => setSplitChar(e.target.value)}
                    className="mr-2 w-[45px] text-center rounded-md border-0 shadow-sm ring-1 ring-inset ring-gray-300"
                  />
                </label>
              </div>
            )}
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onGeneratePassword}
              className="w-full flex flex-row items-center justify-center group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition transform hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <FaKey className="mr-2" /> Generate{" "}
            </button>

            <button
              onClick={async () => {
                await copyToClipboard(passwords.join("\n"));
                toast.success("Passwords copied!");
              }}
              className="bg-blue-500 w-full text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <FaClipboard className="mr-2" /> Copy all
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
