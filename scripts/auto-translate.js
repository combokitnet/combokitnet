/// @ts-check

const fs = require("fs");
const { default: axios } = require("axios");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

function flattenObject(obj, parentKey = "") {
  return Object.keys(obj).reduce((acc, key) => {
    const prefixedKey = parentKey ? `${parentKey}.${key}` : key;
    if (typeof obj[key] === "object") {
      Object.assign(acc, flattenObject(obj[key], prefixedKey));
    } else {
      acc[prefixedKey] = obj[key];
    }
    return acc;
  }, {});
}

function unflattenObject(obj) {
  const result = {};
  for (const key in obj) {
    const keys = key.split(".");
    keys.reduce((acc, cur, index) => {
      if (index === keys.length - 1) {
        acc[cur] = obj[key];
      } else {
        acc[cur] = acc[cur] || {};
        return acc[cur];
      }
    }, result);
  }
  return result;
}

async function translateText(text, { to }) {
  if (!process.env.PAPID_API_KEY) {
    console.log("Not found PAPID_API_KEY on ENV");
    process.exit();
  }
  const options = {
    method: "POST",
    url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.PAPID_API_KEY,
      "X-RapidAPI-Host": "deep-translate1.p.rapidapi.com",
    },
    data: {
      q: text,
      source: "en",
      target: to,
    },
  };

  try {
    const response = await axios.request(options);
    return { text: response.data.data.translations.translatedText };
  } catch (error) {
    console.error("Error translating text:", error.message);
    throw error;
  }
}

async function translateText2(text, { to }) {
  if (!process.env.PAPID_API_KEY) {
    console.log("Not found PAPID_API_KEY on ENV");
    process.exit();
  }

  const map = {
    jv: "id",
  };
  if (map[to]) {
    to = map[to];
  }

  const options = {
    method: "POST",
    url: "https://microsoft-translator-text.p.rapidapi.com/translate",
    params: {
      "to[0]": to,
      "api-version": "3.0",
      from: "en",
      profanityAction: "NoAction",
      textType: "plain",
    },
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.PAPID_API_KEY,
      "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
    },
    data: [
      {
        Text: text,
      },
    ],
  };

  try {
    const response = await axios.request(options);
    return { text: response.data[0].translations[0].text };
  } catch (error) {
    console.error("Error translating text:", error.response.data);
    console.log({ text, to });
    process.exit();
  }
}

async function translateText3(text, { to }) {
  if (!process.env.PAPID_API_KEY) {
    console.log("Not found PAPID_API_KEY on ENV");
    process.exit();
  }

  const encodedParams = new URLSearchParams();
  encodedParams.set("from", "en");
  encodedParams.set("to", to);
  encodedParams.set("text", text);

  const options = {
    method: "POST",
    url: "https://google-translate113.p.rapidapi.com/api/v1/translator/text",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": process.env.PAPID_API_KEY,
      "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);

    return { text: response.data.trans };
  } catch (error) {
    console.error("Error translating text:", error.message);
    throw error;
  }
}

async function autoTranslate(
  enFilePath,
  targetLang = "vi",
  reTranslate = false
) {
  const enData = JSON.parse(fs.readFileSync(enFilePath, "utf8"));
  const targetPath = `../src/messages/${targetLang}.json`;

  let targetData = {};
  try {
    targetData = JSON.parse(fs.readFileSync(targetPath, "utf8"));
  } catch (error) {}

  if (reTranslate) {
    targetData = {};
  }

  const flattenedEnData = flattenObject(enData);
  const flattenedTargetData = flattenObject(targetData);

  for (const key in flattenedEnData) {
    let textEn = flattenedEnData[key];
    if (flattenedTargetData[key]) {
      // by pass exist key translated
      continue;
    }

    let vars = [];
    if (textEn?.includes("{")) {
      vars = textEn.match(/\{(.*?)\}/g) || [];
      vars.forEach((value, index) => {
        textEn = textEn.replace(value, `_${index}_`);
      });
    }

    try {
      // const translation = await translateText(textEn, { to: targetLang }); // deep-translate1
      const translation = await translateText2(textEn, { to: targetLang }); // https://rapidapi.com/microsoft-azure-org-microsoft-cognitive-services/api/microsoft-translator-text/
      // const translation = await translateText3(textEn, { to: targetLang }); // google-translate113

      let translated = translation?.text;
      console.log(translated);
      if (vars?.length > 0) {
        vars.forEach((_value, index) => {
          // console.log({ translated, index: vars[index] });
          translated = translated.replace(`_${index}_`, vars[index]);
        });
      }
      targetData[key] = translated;
    } catch (error) {
      console.error(`Error translating '${key}':`, error);
      process.exit();
    }
  }

  fs.writeFileSync(
    targetPath,
    JSON.stringify(unflattenObject(targetData), null, 2)
  );
  console.log("Done");
}

const locales = [
  "zh", // Chinese (China)
  "es", // Spanish (Spain)
  "hi", // Hindi (India)
  "bn", // Bengali (Bangladesh)
  "pt", // Portuguese (Portugal)
  "ru", // Russian
  "ja", // Japanese (Japan)
  "pa", // Punjabi (Punjab region)
  "de", // German (Germany)
  "jv", // Javanese (Java, Indonesia)
  "ko", // Korean (South Korea)
  "fr", // French (France)
  "tr", // Turkish (Turkey)
  "vi", // Vietnamese (Vietnam)
  "ur", // Urdu (Pakistan)
  "it", // Italian (Italy)
  "th", // Thai (Thailand)
];

// RUN
const reTranslate = false;
console.log("reTranslate", reTranslate);
new Promise((resolve) => setTimeout(resolve, 3000)).then();

const enPath = "../src/messages/en.json";
for (let index = 0; index < locales.length; index++) {
  console.log(`Start en -> ${locales[index]}`);

  autoTranslate(enPath, locales[index], reTranslate)
    .then(() => {
      console.log(`en -> ${locales[index]} -> ok`);
    })
    .catch((e) => {
      console.log(e);
    });

  new Promise((resolve) => setTimeout(resolve, 1000)).then();
}
