import { APP_NAME } from "@/configs/const";
import Link from "next/link";
import { IoIosMailUnread } from "react-icons/io";

export default function Subscribing() {
  return (
    <div className="flex p-[12px] items-center justify-center">
      <aside className="p-4 my-8 max-w-[700px] bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">
          Get more updates...
        </h3>

        <p className="mb-5 text-sm font-medium text-gray-500 dark:text-gray-300">
          Do you want to get notified when a new toolkit is added to {APP_NAME}?{" "}
          <br /> Sign up for our newsletter and you'll be among the first to
          find out about new features, components, versions, and tools.
        </p>

        <form
          onSubmit={(e) => {
            console.log(e.target);
            //TODO: add send sub email to api
          }}
        >
          <div data-style="clean" className="flex items-end mb-3">
            <ul
              className="formkit-alert formkit-alert-error"
              data-element="errors"
              data-group="alert"
            />
            <div
              data-element="fields"
              data-stacked="false"
              className="flex items-center w-full mb-3 seva-fields formkit-fields"
            >
              <div className="relative w-full mr-3 formkit-field">
                <label
                  htmlFor="member_email"
                  className="hidden  mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                  <IoIosMailUnread size={22} />
                </div>
                <input
                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  name="email"
                  aria-label="Email Address"
                  placeholder="Your email address..."
                  required={true}
                  type="email"
                />
              </div>
              <button data-element="submit" className="formkit-submit">
                <div className="formkit-spinner">
                  <div />
                  <div />
                  <div />
                </div>
                <span className="px-5 py-3 text-sm font-medium text-center text-white bg-purple-700 rounded-lg cursor-pointer hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                  Subscribe
                </span>
              </button>
            </div>
          </div>
        </form>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          By subscribing, you agree with{" "}
          <Link
            rel="nofollow"
            href="/tos"
            className="text-blue-600 hover:underline dark:text-blue-500"
          >
            Terms of Service
          </Link>
        </div>
      </aside>
    </div>
  );
}
