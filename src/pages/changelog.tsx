import AppLayout from "@/components/AppLayout";
import { LOCAL_STORAGE } from "@/configs/const";
import { useEffect, useState } from "react";

// date: yyyy-mm-dd

const changelogData = [
  {
    date: "2024-12-26",
    label: "Password Copy History",
    desc: 'Added a new feature to the <strong><a href="/tools/password-generator" class="text-blue-500 hover:underline">Password Generator</a></strong>, allowing users to view and manage their password copy history for convenience and security.',
  },
  {
    date: "2024-05-20",
    label: "Cloudflare Support",
    desc: "Added support for <strong>Cloudflare integration</strong> to improve website performance.",
  },
  {
    date: "2023-09-01",
    label: "UI/UX Enhancement",
    desc: "Enhanced <em>UI/UX design</em> with modern Tailwind CSS styles.",
  },
  {
    date: "2023-05-10",
    label: "Image Optimization Tool",
    desc: `Added the <strong><a href="/tools/image-optimization" class="text-blue-500 hover:underline">Image Optimization</a></strong> tool, enabling efficient resizing and compression of images.`,
  },
  {
    date: "2023-03-01",
    label: "Password Generator Added",
    desc: 'Introduced the <strong><a href="/tools/password-generator" class="text-blue-500 hover:underline">Password Generator</a></strong> tool, offering customizable options for secure password creation.',
  },
  {
    date: "2023-01-01",
    label: "Initial Release",
    desc: "Initial release with basic tools and features.",
  },
];

const Changelog: React.FC = () => {
  const [lastReadDate, setLastReadDate] = useState<Date | null>(null);

  useEffect(() => {
    const lastRead = localStorage.getItem(LOCAL_STORAGE.CHANGELOG_LAST_READ);
    if (lastRead) {
      setLastReadDate(new Date(lastRead));
    }
    const now = new Date();
    localStorage.setItem(LOCAL_STORAGE.CHANGELOG_LAST_READ, now.toISOString());
    setLastReadDate(now);
  }, []);

  return (
    <AppLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mt-[80px]">Changelog</h1>
        <div className="mt-6 md:mt-10">
          <ul className="space-y-6 md:space-y-8">
            {changelogData.map((log, index) => {
              const logDate = new Date(log.date); // log.date as yyyy-mm-dd
              const isNew = lastReadDate ? logDate > lastReadDate : true;

              return (
                <li
                  key={index}
                  className={`flex flex-col md:flex-row items-start p-3 md:p-4 ${
                    isNew ? "bg-yellow-100" : ""
                  }`}
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {changelogData.length - index}
                  </div>
                  <div className="ml-0 md:ml-6 mt-2 md:mt-0">
                    <div className="text-lg md:text-xl font-semibold text-gray-700">
                      {log.label}
                    </div>
                    <div className="text-xs md:text-sm text-gray-500">
                      {log.date}
                    </div>
                    <p
                      className="mt-1 md:mt-2 text-gray-600 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: log.desc }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
};
export default Changelog;
