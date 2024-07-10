import { APP_NAME } from "@/configs/const";
import useTranslate from "@/hooks/useTranslate";
import { useState } from "react";

const IconDown = () => (
  <svg
    data-accordion-icon=""
    className="w-6 h-6 shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const IconUp = () => (
  <svg
    data-accordion-icon=""
    className="w-6 h-6 rotate-180 shrink-0"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Questions() {
  const { t } = useTranslate();
  const [open, setOpen] = useState(-1);
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-24 lg:px-6">
          <div className="max-w-screen-md mx-auto mb-8 text-center lg:mb-12">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {t("home.questions.title")}
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
              {t("home.questions.desc", { value: APP_NAME })}
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 pb-8 mx-auto lg:pb-24 lg:px-6 ">
          <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-center text-gray-900 lg:mb-8 lg:text-3xl dark:text-white">
            {t("home.questions.text")}
          </h2>
          <div className="max-w-screen-md mx-auto">
            <div
              id="accordion-flush"
              data-accordion="collapse"
              data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
              {[
                {
                  question: t("home.questions.question1", { value: APP_NAME }),
                  answer: t("home.questions.answer1", { value: APP_NAME }),
                },
                {
                  question: t("home.questions.question2", { value: APP_NAME }),
                  answer: t("home.questions.answer2", { value: APP_NAME }),
                },
                {
                  question: t("home.questions.question3", { value: APP_NAME }),
                  answer: t("home.questions.answer3", { value: APP_NAME }),
                },
                {
                  question: t("home.questions.question4", { value: APP_NAME }),
                  answer: t("home.questions.answer4", { value: APP_NAME }),
                },
                {
                  question: t("home.questions.question5", { value: APP_NAME }),
                  answer: t("home.questions.answer5", { value: APP_NAME }),
                },
              ].map((m, i) => {
                const isOpen = open === i;
                return (
                  <div key={i}>
                    <h3
                      onClick={() => {
                        if (isOpen) {
                          setOpen(-1);
                        } else {
                          setOpen(i);
                        }
                      }}
                      className="cursor-pointer"
                    >
                      <button
                        type="button"
                        className={
                          isOpen
                            ? "flex items-center justify-between w-full py-5 font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                            : "flex items-center justify-between w-full py-5 font-medium text-left border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                        }
                      >
                        <span>{m.question}</span>
                        {isOpen ? <IconUp /> : <IconDown />}
                      </button>
                    </h3>
                    <div className={isOpen ? "" : "hidden"}>
                      <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p
                          className={
                            isOpen
                              ? "mb-2 text-gray-900 dark:text-gray-700"
                              : "mb-2 text-gray-500 dark:text-gray-400"
                          }
                        >
                          {m.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
