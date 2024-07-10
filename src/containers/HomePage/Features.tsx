import useTranslate from "@/hooks/useTranslate";

const Icon = () => (
  <svg
    className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Features() {
  const { text } = useTranslate();
  const a = text?.home?.features;
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">
        <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <div className="text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {a?.topic1}
            </h2>
            <p className="mb-8 font-light lg:text-xl">{a?.topic1_desc1}</p>
            <ul
              role="list"
              className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
            >
              {[
                a?.topic1_item1,
                a?.topic1_item2,
                a?.topic1_item3,
                a?.topic1_item4,
                a?.topic1_item5,
              ].map((m, i) => (
                <li key={i} className="flex space-x-3">
                  <Icon />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mb-8 font-light lg:text-xl">{a?.topic1_desc2}</p>
          </div>
          <img
            className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
            src="/images/feature-1.png"
            alt="dashboard feature image"
          />
        </div>

        {/* Row */}
        <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <img
            className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex"
            src="/images/feature-2.png"
            alt="feature image 2"
          />
          <div className="text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {a?.topic2}
            </h2>
            <p className="mb-8 font-light lg:text-xl">{a?.topic2_desc1}</p>

            <ul
              role="list"
              className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700"
            >
              {[
                a?.topic2_item1,
                a?.topic2_item2,
                a?.topic2_item3,
                a?.topic2_item4,
                a?.topic2_item5,
              ].map((m, i) => (
                <li key={i} className="flex space-x-3">
                  <Icon />
                  <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
            <p className="font-light lg:text-xl">{a?.topic2_desc2}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
