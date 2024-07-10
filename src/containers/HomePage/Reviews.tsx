import { CgProfile } from "react-icons/cg";

const reviews = [
  {
    name: "Emily Johnson",
    position: "Digital Marketer",
    description:
      "ComboKit.Net has revolutionized my workflow! The tools are incredibly easy to use, and I love how they constantly update to meet my evolving needs.",
  },
  {
    name: "Alex Chen",
    position: "Entrepreneur",
    description:
      "I've tried numerous digital toolkits, but ComboKit.Net stands out for its seamless integration and top-notch customer support. It's a game-changer for anyone serious about digital productivity.",
  },
  {
    name: "David Rodriguez",
    position: "Software Developer",
    description:
      "ComboKit.Net has simplified my coding tasks immensely. The code converter feature is a lifesaver, and I appreciate the responsive support team always ready to assist.",
  },
  {
    name: "Jessica Smith",
    position: "Social Media Manager",
    description:
      "As a social media manager, I rely on ComboKit.Net daily to download content from various platforms. It's fast, reliable, and has saved me countless hours of manual work.",
  },
  {
    name: "Michael Brown",
    position: "Data Privacy Advocate",
    description:
      "Security is a top priority for me, and ComboKit.Net delivers. I feel confident knowing my data is protected while using their tools. Highly recommended for anyone concerned about online privacy.",
  },
];

const Icon = () => (
  <svg
    className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
    viewBox="0 0 24 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
      fill="currentColor"
    />
  </svg>
);

export default function Reviews() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-24 lg:px-6">
        <figure className="max-w-screen-md mx-auto">
          <Icon />

          <blockquote>
            <p className="text-xl font-medium text-gray-900 md:text-2xl dark:text-white">
              Landwind is just awesome. It contains tons of predesigned
              components and pages starting from login screen to complex
              dashboard. Perfect choice for your next SaaS application.
            </p>
          </blockquote>

          <figcaption className="flex items-center justify-center mt-6 space-x-3">
            {/* <img
              className="w-6 h-6 rounded-full"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
              alt="profile picture"
            /> */}

            <CgProfile />

            <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
              <div className="pr-3 font-medium text-gray-900 dark:text-white">
                Micheal Gough
              </div>
              <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                CEO at Google
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
