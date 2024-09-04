// TODO: add get content share from api include: random content, hashtag
"use client";

import { DropDown } from "@/components/DropDown";
import { handleShare, SocialPlatform } from "@/utils/social";
import { useEffect, useState } from "react";
import {
  FaCopy,
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaReddit,
  FaShare,
  FaTelegram,
  FaTumblr,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { TTool } from "./types";

export default function ShareSocial({ data }: { data: TTool }) {
  const content = `${data?.name} | ${data?.description}`.trim();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window?.location?.origin);
  }, []);

  return (
    <DropDown
      items={[
        {
          label: "Facebook",
          onClick: () =>
            handleShare(SocialPlatform.Facebook, currentUrl, content),
          icon: <FaFacebook size={"18px"} color="#3b5998" />,
        },
        {
          label: "Twitter/X",
          onClick: () =>
            handleShare(SocialPlatform.Twitter, currentUrl, content),
          icon: <FaTwitter size={"18px"} color="#1DA1F2" />,
        },
        {
          label: "Telegram",
          onClick: () =>
            handleShare(SocialPlatform.Telegram, currentUrl, content),
          icon: <FaTelegram size={"18px"} color="#0088cc" />,
        },
        {
          label: "WhatsApp",
          onClick: () =>
            handleShare(SocialPlatform.WhatsApp, currentUrl, content),
          icon: <FaWhatsapp size={"18px"} color="#25D366" />,
        },
        {
          label: "LinkedIn",
          onClick: () =>
            handleShare(SocialPlatform.LinkedIn, currentUrl, content),
          icon: <FaLinkedin size={"18px"} color="#0077b5" />,
        },
        {
          label: "Pinterest",
          onClick: () =>
            handleShare(SocialPlatform.Pinterest, currentUrl, content),
          icon: <FaPinterest size={"18px"} color="#bd081c" />,
        },
        {
          label: "Reddit",
          onClick: () =>
            handleShare(SocialPlatform.Reddit, currentUrl, content),
          icon: <FaReddit size={"18px"} color="#ff4500" />,
        },
        {
          label: "Tumblr",
          onClick: () =>
            handleShare(SocialPlatform.Tumblr, currentUrl, content),
          icon: <FaTumblr size={"18px"} color="#35465C" />,
        },
        {
          label: "Copy link",
          onClick: () => {
            navigator.clipboard.writeText(currentUrl);
            alert("Link copied to clipboard!");
          },
          icon: <FaCopy size={"18px"} color="#000000" />,
        },
      ]}
    >
      <button className="flex gap-[6px] items-center justify-center w-full p-[5px] text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
        <FaShare size={"18px"} />
      </button>
    </DropDown>
  );
}
