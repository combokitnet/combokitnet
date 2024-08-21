// TODO: add suggest weak password
// TODO: add time for hacking an password

import React, { useState } from "react";
import { calculateHackTime } from "./utils";

const PasswordGenerator: React.FC = () => {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [length, setLength] = useState<number>(12);
  const [quantity, setQuantity] = useState<number>(5);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let charset = "";
    if (includeLowercase) charset += lowercase;
    if (includeUppercase) charset += uppercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

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

  const copyToClipboard = (password: string) => {
    navigator.clipboard.writeText(password).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  React.useEffect(() => {
    generatePassword();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="block font-semibold">Password Length: {length}</label>
        <input
          type="range"
          min="6"
          max="32"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">
          Number of Passwords: {quantity}
        </label>
        <input
          type="range"
          min="1"
          max="20"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      <div className="flex gap-5">
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={() => setIncludeLowercase(!includeLowercase)}
              className="mr-2"
            />
            Lowercase Letters
          </label>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={() => setIncludeUppercase(!includeUppercase)}
              className="mr-2"
            />
            Uppercase Letters
          </label>
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Generate Passwords
        </button>
        <button
          onClick={() => generatePassword()}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Reload
        </button>
      </div>

      {passwords.length > 0 && (
        <div className="mt-4">
          <label className="block font-semibold">Generated Passwords:</label>
          <ul className="space-y-2">
            {passwords.map((password, index) => (
              <li
                key={index}
                className="bg-gray-100 p-2 rounded flex justify-between items-center"
              >
                <span className="break-all">{password}</span>
                <span className="break-all">{calculateHackTime(password)}</span>
                <button
                  onClick={() => copyToClipboard(password)}
                  className="bg-green-500 text-white px-2 py-1 rounded ml-4"
                >
                  Copy
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordGenerator;
