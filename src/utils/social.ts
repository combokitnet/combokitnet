import toast from "react-hot-toast";

export enum SocialPlatform {
  Facebook = "facebook",
  Twitter = "twitter",
  Telegram = "telegram",
  WhatsApp = "whatsapp",
  LinkedIn = "linkedin",
  Pinterest = "pinterest",
  Reddit = "reddit",
  Tumblr = "tumblr",
  Quora = "quora",
}

export function handleShare(
  platform: SocialPlatform,
  url: string,
  text?: string
): void {
  const validPlatforms: SocialPlatform[] = Object.values(SocialPlatform); // Get all platform values

  if (!validPlatforms.includes(platform)) {
    console.error(`Invalid platform: ${platform}`);
    toast.error("Share got missing.");
    return;
  }

  const shareOptions: { [key in SocialPlatform]: string } = {
    [SocialPlatform.Facebook]: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&t=${text}`,

    [SocialPlatform.Twitter]: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text || ""
    )}&url=${encodeURIComponent(url)}`,

    [SocialPlatform.Telegram]: `https://t.me/share/url?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text || "")}`,

    [SocialPlatform.WhatsApp]: `https://wa.me/share?text=${encodeURIComponent(
      text || ""
    )}&url=${encodeURIComponent(url)}`,

    [SocialPlatform.LinkedIn]: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(text || "")}`,

    [SocialPlatform.Pinterest]: `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      url
    )}&description=${encodeURIComponent(text || "")}`,

    [SocialPlatform.Reddit]: `https://www.reddit.com/submit?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(text || "")}`,

    [SocialPlatform.Tumblr]: `https://www.tumblr.com/share/link?url=${encodeURIComponent(
      url
    )}&name=${encodeURIComponent(text || "")}`,

    [SocialPlatform.Quora]: `https://www.quora.com/q/add?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(text || "")}`,
  };
}

// {
//   "Facebook": "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization&t=Image%20Compression",
//   "Twitter": "https://twitter.com/intent/tweet?text=Image%20Compression&url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization",
//   "Telegram": "https://t.me/share/url?url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization&text=Image%20Compression",
//   "WhatsApp": "https://wa.me/share?text=Image%20Compression&url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization",
//   "LinkedIn": "https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization&title=Image%20Compression",
//   "Pinterest": "https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization&description=Image%20Compression",
//   "Reddit": "https://www.reddit.com/submit?url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization&title=Image%20Compression",
//   "Tumblr": "https://www.tumblr.com/share/link?url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization&name=Image%20Compression",
//   "Instagram": "https://www.instagram.com/?url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization",
//   "Quora": "https://www.quora.com/q/add?url=https%3A%2F%2Fcombokit.net%2Ftools%2Fimage-optimization&title=Image%20Compression"
// }
