import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import localeMaps from "../../public/locales.json";

const getLocale = async (lang = "en") => {
  return (await import(`@/messages/${lang}.json`)).default;
};

export default function useTranslate() {
  const { locale } = useRouter();
  const [data, setData] = useState<IntlMessages>();

  useEffect(() => {
    if (locale) {
      getLocale(locale)
        .then((res: IntlMessages) => {
          setData(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [locale]);

  const t = (key: string, values?: { [k in string]: string }) => {
    if (!data) {
      return "--";
    }

    let array = key?.split(".");
    let keyValue: any = data[array[0] as keyof IntlMessages] || "--";
    if (array.length > 1) {
      for (let index = 1; index < array.length; index++) {
        keyValue = keyValue[array[index] as keyof IntlMessages] || "--";
      }
    }

    if (keyValue?.includes("{")) {
      for (const v in values) {
        if (Object.prototype.hasOwnProperty.call(values, v)) {
          const xKey = `{${v}}`;
          const xValue = `${values[v]}`;
          keyValue = (keyValue as string).replace(xKey, xValue);
        }
      }
    }

    if (keyValue === "--") {
      console.error(`The key: ${key} not found in the ${locale}.json`);
    }
    return keyValue;
  };

  return {
    text: data, // all keys
    t, // func('a.b', {value: ""})
    locale, // current lang
    locales: localeMaps, // list locales
  };
}
