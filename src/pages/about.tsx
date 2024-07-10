import AppLayout from "@/components/AppLayout";
import { APP_NAME } from "@/configs/const";
import Link from "next/link";
import { MdOutlineLightbulb } from "react-icons/md";

export default function About() {
  return (
    <AppLayout>
      <div className="max-w-[992px] mx-auto p-4 pt-6">
        <img className="m-[0_auto]" src="/images/about.svg" alt="about" />
        <h1 className="text-3xl text-center font-bold">
          Welcome to {APP_NAME}
        </h1>
        <p className="text-lg mt-4">
          Our mission is to empower individuals to{" "}
          <span className="text-green-500 font-bold">
            work smarter, not harder
          </span>
          . We&#39;ve curated a comprehensive collection of free online toolkits
          to help streamline your work and boost productivity.
        </p>
        <p className="text-lg mt-4">
          Our toolkits cater to various needs, from project management
          essentials to creative design resources.
        </p>
        <p className="text-lg mt-4">
          We&#39;re not just about providing toolkits; we&#39;re committed to
          building a collaborative community. Your feedback is invaluable in
          shaping our offerings.{" "}
          <a
            className="underline text-green-600"
            href="https://forms.gle/ZjPaiWV1BL5hm6sJ7"
          >
            Forms here
          </a>
        </p>
        <p className="text-lg mt-4">
          Join us on this journey towards{" "}
          <span className="text-green-500 font-bold">
            efficiency, innovation, and productivity
          </span>
          . Let&#39;s make work more enjoyable and impactful together!
        </p>

        <p className="text-lg mt-4">
          Share your thoughts and ideas through our feedback form.
        </p>
        <p className="text-lg mt-4">
          Additionally, you can{" "}
          <span className="text-green-500 font-bold">earn money</span> by
          suggesting or contributing to toolkits. Let&#39;s work together to
          create toolkits tailored to your needs!
        </p>
        <br />
        <Link
          target="_blank"
          href={`https://forms.gle/VBG32kTUUATUtwq16`}
          className="flex gap-[6px] items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          <MdOutlineLightbulb className="w-4 h-4 mr-2 " />{" "}
          <span>Submit your idea</span>
        </Link>
      </div>
    </AppLayout>
  );
}
