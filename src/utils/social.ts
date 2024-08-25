export enum SocialPlatform {
  Facebook = "facebook",
  Twitter = "twitter",
  Telegram = "telegram",
  WhatsApp = "whatsapp",
  LinkedIn = "linkedin",
  Pinterest = "pinterest",
  Reddit = "reddit",
  Tumblr = "tumblr",
  Instagram = "instagram",
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
    )}`,
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
    [SocialPlatform.Instagram]: `https://www.instagram.com/?url=${encodeURIComponent(
      url
    )}`,
    [SocialPlatform.Quora]: `https://www.quora.com/q/add?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(text || "")}`,
  };

  window.open(shareOptions[platform], "_blank");
}
