import Subscribing from "@/components/Subscribing";
import { APP_NAME, APP_SOCIAL } from "@/configs/const";
import useTranslate from "@/hooks/useTranslate";
import Link from "next/link";
import { FaGithub, FaSearch } from "react-icons/fa";
import Questions from "./Questions";
import RecentUsed from "./RecentUsed";
import Typer from "./Typer";

export default function HomePage() {
  const { text } = useTranslate();
  const textHome = text?.home;

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
          <div className="mr-auto place-self-center lg:col-span-7">
            {textHome?.banner?.title1 ? (
              <Typer
                dataText={[
                  textHome?.banner?.title1 || "",
                  textHome?.banner?.title2 || "",
                  textHome?.banner?.title3 || "",
                  textHome?.banner?.title4 || "",
                  textHome?.banner?.title5 || "",
                ]}
              />
            ) : (
              ""
            )}
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              {textHome?.banner?.desc1}{" "}
              <strong className="text-black font-bold">{APP_NAME}</strong>,{" "}
              {textHome?.banner?.desc2}
            </p>
            <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              <Link
                target="_blank"
                href={APP_SOCIAL.github || "#"}
                className="flex gap-[6px] items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                <FaGithub className="w-4 h-4 mr-2 " />{" "}
                <span>{textHome?.banner?.btn1} GitHub</span>
              </Link>

              <Link
                href={"/tools"}
                className="flex gap-[6px] items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                <FaSearch className="w-4 h-4 mr-2 " />{" "}
                <span>{textHome?.banner?.btn2}</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="/images/banner.jpg" alt="hero image" />
          </div>
        </div>
      </section>

      <RecentUsed />
      {/* <Features /> */}
      {/* <Trusted /> */}
      {/* <Reviews /> */}
      <Questions />

      <section className="bg-gray-50 dark:bg-gray-800">
        <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
          <div className="max-w-screen-sm mx-auto text-center">
            <h2 className="mb-4 text-3xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
              Start your free trial today
            </h2>
            <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
              Try {APP_NAME} Platform for free. No credit card required.
            </p>
            <Link
              href="/tools"
              className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800"
            >
              Explore tools
            </Link>
          </div>
        </div>
      </section>

      <Subscribing />
    </>
  );
}
