import { APP_NAME } from "@/configs/const";
import useTranslate from "@/hooks/useTranslate";
import useWindowSize from "@/hooks/useWindowSize";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { HTMLAttributeAnchorTarget, useState } from "react";
import { BsList } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const navs: {
  page: string;
  path: string;
  target: HTMLAttributeAnchorTarget;
}[] = [
  { page: "home.header.nav.home", path: "/", target: "_self" },
  { page: "home.header.nav.tools", path: "/tools", target: "_self" },
  {
    page: "home.header.nav.blog",
    path: "https://blog.combokit.net",
    target: "_blank",
  },
  { page: "home.header.nav.about", path: "/about", target: "_self" },
];

export default function Header() {
  const { t, locales, locale } = useTranslate();
  const { width } = useWindowSize();
  const [mobileNav, setMobileNav] = useState(false);
  const router = useRouter();

  return (
    <header className="fixed w-full bg-white z-10">
      <nav className="border-gray-200 py-2.5 dark:bg-gray-900 shadow-[0_-6px_10px_5px_rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          <Link href="/" className="flex items-center">
            <img
              src="/favicon.ico"
              className="h-6 mr-3 sm:h-9"
              alt={`${APP_NAME} Logo`}
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {APP_NAME}
            </span>
          </Link>

          <div className="flex items-center lg:order-2 gap-[12px]">
            <select
              onChange={(e) => {
                router.push(router.pathname, router.pathname, {
                  locale: e.target.value,
                  unstable_skipClientCache: true,
                  shallow: true,
                });
                Cookies.set("NEXT_LOCALE", e.target.value);
              }}
              defaultValue={locale?.toLowerCase()}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {locales.map((m, i) => (
                <option key={`lang_${m.code}`} value={m.code}>
                  {m.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={(e) => {
                e.preventDefault();
                setMobileNav((m) => !m);
              }}
            >
              {mobileNav ? <MdClose size={24} /> : <BsList size={24} />}
            </button>

            {/* {width >= 992 ? (
              <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-purple-600 dark:hover:bg-purple-700 capitalize focus:outline-none dark:focus:ring-purple-800 flex items-center">
                <MdAttachMoney size={20} /> contribute
              </button>
            ) : (
              ""
            )} */}
          </div>

          <div
            className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${
              mobileNav ? "" : "hidden"
            }`}
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {navs.map((n, i) => (
                <li key={`nav_${i}`}>
                  <Link
                    target={n.target}
                    href={n.path}
                    className={`${
                      n.path === router.pathname
                        ? "block py-2 pl-3 pr-4 text-white bg-purple-700 rounded lg:bg-transparent lg:text-purple-700 lg:p-0 dark:text-white"
                        : "block py-2 pl-3 pr-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-purple-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                    }`}
                    aria-current="page"
                  >
                    {n.page?.includes("tool") ? "⚡️" : ""} {t(n.page)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
