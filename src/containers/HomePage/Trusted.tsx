import { APP_NAME } from "@/configs/const";
import useTranslate from "@/hooks/useTranslate";

const Icon = () => (
  <svg
    className="w-5 h-5 ml-1"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
export default function Trusted() {
  const { t } = useTranslate();
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="items-center max-w-screen-xl px-4 py-8 mx-auto lg:grid lg:grid-cols-4 lg:gap-16 xl:gap-24 lg:py-24 lg:px-6">
        <div className="col-span-2 mb-8">
          <p className="text-lg font-medium text-purple-600 dark:text-purple-500">
            {t("home.trusted.text1")}
          </p>
          <h2 className="mt-3 mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
            {t("home.trusted.text2", { users: "7 million", teams: "1000" })}
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            {t("home.trusted.text3")}
          </p>
          <div className="pt-6 mt-6 space-y-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <a
                href="#"
                className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
              >
                {t("home.trusted.text4")}
                <Icon />
              </a>
            </div>
            <div>
              <a
                href="#"
                className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
              >
                {t("home.trusted.text5")}
                <Icon />
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          <div>
            <svg
              className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">
              {t("home.trusted.text6", { value: "99" })}
            </h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              {t("home.trusted.text7", { value: APP_NAME })}
            </p>
          </div>
          <div>
            <svg
              className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">
              {t("home.trusted.text8", { value: "600M+" })}
            </h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              {t("home.trusted.text7", { value: "600M+" })}
            </p>
          </div>
          <div>
            <svg
              className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">
              {t("home.trusted.text10")}
            </h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              {t("home.trusted.text11", { value: APP_NAME })}
            </p>
          </div>
          <div>
            <svg
              className="w-10 h-10 mb-2 text-purple-600 md:w-12 md:h-12 dark:text-purple-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <h3 className="mb-2 text-2xl font-bold dark:text-white">
              {t("home.trusted.text12", { value: "5+" })}
            </h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              {t("home.trusted.text13")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
