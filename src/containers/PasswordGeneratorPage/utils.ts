import {
  base64Chars,
  hexChars,
  lowercase,
  numbers,
  similarChars,
  specialCharMap,
  symbols,
  uppercase,
  wordList,
} from "./const";

export type PasswordType =
  | "normal"
  | "words"
  | "wordsWithSymbols"
  | "hex"
  | "base64"
  | "secure";

export type PasswordTypeConfig = {
  name: string;
  minLength: number;
  canCustomize: {
    lowerCase: boolean;
    upperCase: boolean;
    numbers: boolean;
    symbols: boolean;
  };
  description: string;
  typeCount: "char" | "word";
};

export const passwordConfigs: Record<PasswordType, PasswordTypeConfig> = {
  // char
  normal: {
    name: "Normal",
    minLength: 12,
    typeCount: "char",
    canCustomize: {
      lowerCase: true,
      upperCase: true,
      numbers: true,
      symbols: true,
    },
    description: "A standard password composed of random characters.",
  },
  hex: {
    name: "Hex",
    minLength: 16,
    typeCount: "char",
    canCustomize: {
      lowerCase: false,
      upperCase: false,
      numbers: false,
      symbols: false,
    },
    description: "A password represented in hexadecimal format.",
  },
  base64: {
    name: "Base64",
    minLength: 16,
    typeCount: "char",
    canCustomize: {
      lowerCase: false,
      upperCase: false,
      numbers: false,
      symbols: false,
    },
    description: "A password encoded in Base64 format.",
  },
  secure: {
    name: "Secure",
    minLength: 16,
    typeCount: "char",
    canCustomize: {
      lowerCase: true,
      upperCase: true,
      numbers: true,
      symbols: true,
    },
    description:
      "A highly secure password generated with various character types.",
  },

  // word
  words: {
    name: "Words",
    minLength: 3,
    typeCount: "word",
    canCustomize: {
      lowerCase: false,
      upperCase: false,
      numbers: false,
      symbols: false,
    },
    description: "A password created from a series of random words.",
  },
  wordsWithSymbols: {
    name: "Words with Symbols",
    minLength: 3,
    typeCount: "word",
    canCustomize: {
      lowerCase: false,
      upperCase: false,
      numbers: false,
      symbols: false,
    },
    description:
      "A password made of random words with special character substitutions.",
  },
};

export const mapPasswordConfig = Object.keys(passwordConfigs) as PasswordType[];

export interface PasswordOptions {
  length: number;
  type: PasswordType;
  includeNumber?: boolean;
  includeSymbol?: boolean;
  includeLowercase?: boolean;
  includeUppercase?: boolean;
  noSimilarCharacters?: boolean;
  noDuplicateCharacters?: boolean;
  noSequentialCharacters?: boolean;
  splitChar?: string; // Optional split character for words
  customCharset?: string; // Custom character set for 'custom' type
}

export const mapWordWithSymbol = (
  word: string,
  mapObject: { [key: string]: string }
): string => {
  return word
    .split("")
    .map((char) => mapObject[char] || char)
    .join("");
};

export const generatePassword = (options: PasswordOptions): string => {
  let charset = "";
  let password = "";

  const splitChar = options?.splitChar || "";

  switch (options.type) {
    case "normal": {
      if (options.includeLowercase) charset += lowercase;
      if (options.includeUppercase) charset += uppercase;
      if (options.includeNumber) charset += numbers;
      if (options.includeSymbol) charset += symbols;

      if (options.noSimilarCharacters) {
        charset = charset
          .split("")
          .filter((c) => !similarChars.includes(c))
          .join("");
      }

      while (password.length < options.length) {
        const char = charset[Math.floor(Math.random() * charset.length)];

        if (options.noDuplicateCharacters && password.includes(char)) continue;
        if (
          options.noSequentialCharacters &&
          password.length > 0 &&
          Math.abs(
            char.charCodeAt(0) - password.charCodeAt(password.length - 1)
          ) === 1
        )
          continue;

        password += char;
      }
      break;
    }

    case "words":
    case "wordsWithSymbols": {
      let array: string[] = [];

      while (array.length < options.length) {
        let word = wordList[Math.floor(Math.random() * wordList.length)];
        if (options.type === "wordsWithSymbols") {
          word = mapWordWithSymbol(word, specialCharMap);
        }
        if (array.findIndex((m) => m === word) != -1) {
          continue;
        }
        array.push(word);
      }

      password = array.join(splitChar);

      break;
    }

    case "hex": {
      charset = hexChars;

      while (password.length < options.length) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        password += char;
      }
      break;
    }

    case "base64": {
      charset = base64Chars;

      while (password.length < options.length) {
        const char = charset[Math.floor(Math.random() * charset.length)];
        password += char;
      }
      break;
    }

    case "secure": {
      const requiredChars = [
        options.includeLowercase ? lowercase : "",
        options.includeUppercase ? uppercase : "",
        options.includeNumber ? numbers : "",
        options.includeSymbol ? symbols : "",
      ].join("");

      while (password.length < options.length) {
        const char =
          requiredChars[Math.floor(Math.random() * requiredChars.length)];
        password += char;
      }

      // Ensure it meets all criteria
      if (options.includeLowercase && !/[a-z]/.test(password))
        password += lowercase[Math.floor(Math.random() * lowercase.length)];
      if (options.includeUppercase && !/[A-Z]/.test(password))
        password += uppercase[Math.floor(Math.random() * uppercase.length)];
      if (options.includeNumber && !/[0-9]/.test(password))
        password += numbers[Math.floor(Math.random() * numbers.length)];
      if (options.includeSymbol && !/[!@#$%^&*()_+[\]{}<>?]/.test(password))
        password += symbols[Math.floor(Math.random() * symbols.length)];

      // Truncate to the desired length
      password = password.slice(0, options.length);
      break;
    }
  }

  return password;
};

export const calculateHackTime = (password: string) => {
  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/\d/.test(password)) charsetSize += 10;
  if (/[\W_]/.test(password)) charsetSize += 32;
  const combinations = Math.pow(charsetSize, password.length);
  const guessesPerSecond = 1e9;
  const secondsToHack = combinations / guessesPerSecond;
  const minutes = secondsToHack / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;
  if (years > 1e6) return "Millions of years";
  if (years > 1) return `${Math.round(years)} years`;
  if (days > 1) return `${Math.round(days)} days`;
  if (hours > 1) return `${Math.round(hours)} hours`;
  if (minutes > 1) return `${Math.round(minutes)} minutes`;
  return `${Math.round(secondsToHack)} seconds`;
};
