import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClipboard, FaKey } from "react-icons/fa";
import { calculateHackTime } from "./utils";

const lowercase = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

const copyToClipboard = (password: string) => {
  navigator?.clipboard?.writeText(password).then(() => {
    toast.success("Password copied!");
  });
};

const PasswordGenerator: React.FC = () => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [length, setLength] = useState<number>(12);
  const [quantity, setQuantity] = useState<number>(3);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [charset, setCharset] = useState<string>(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  );

  const generatePassword = () => {
    const generatedPasswords = Array.from({ length: quantity }, () => {
      let generatedPassword = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        generatedPassword += charset[randomIndex];
      }
      return generatedPassword;
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
    generatePassword();
  }, [length, quantity, charset]);

  return (
    <div className="container mx-auto p-4 max-w-[1200px]">
      <div className="mb-4 flex justify-end">
        <select
          className="bg-gray-50 px-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[50%] max-w-[200px]"
          defaultValue={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        >
          {Array(25)
            .fill(0)
            .map((_, i) => (
              <option key={i} value={i + 1}>
                Generator {i + 1} password
              </option>
            ))}
        </select>
      </div>

      {passwords.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-2">
            {passwords.map((password, index) => (
              <li key={index} className="mb-3">
                <div
                  onDoubleClick={() => copyToClipboard(password)}
                  className="bg-gray-100 p-2 rounded flex justify-between items-center"
                >
                  <span className="w-full break-all text-center text-[18px] font-bold">
                    {password}
                  </span>
                  <button
                    onClick={() => copyToClipboard(password)}
                    className="bg-green-500 text-white select-none px-2 py-1 rounded ml-4"
                  >
                    Copy
                  </button>
                </div>
                <p className="break-all select-none text-[12px]">
                  Estimated time to crack: {calculateHackTime(password)}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5">
        <p className="font-semibold">Additional Options</p>
        <div className="p-5">
          <div className="mb-4">
            <label className="block ">Password Length: {length}</label>
            <input
              type="range"
              min="6"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full mt-2"
            />
          </div>

          <div className="flex gap-5 flex-wrap mb-4">
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
          </div>

          <div className="flex space-x-4">
            <button
              onClick={generatePassword}
              className="bg-blue-500 w-full text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <FaKey className="mr-2" /> Generate Passwords
            </button>
            <button
              onClick={() => {
                copyToClipboard(passwords.join("\n"));
              }}
              className="bg-blue-500 w-full text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <FaClipboard className="mr-2" /> Copy all
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block ">Charset: Allow only this chars</label>
          <textarea
            value={charset}
            onChange={(e) => setCharset(e.target.value)}
            className="w-full block p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
