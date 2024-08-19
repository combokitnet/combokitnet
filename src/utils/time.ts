export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;
export const YEAR = 365 * DAY;

export const delayTPS = async (tps: number) => {
  return delay(1000 / tps);
};

export const delay = async (delayTimeMS: number) => {
  return new Promise((resolve) => setTimeout(resolve, delayTimeMS));
};

export type TimeUnit = "ms" | "s" | "m" | "h" | "d" | "w" | "mo" | "y";

export function timeFormat(time: number, timeUnit: TimeUnit = "ms"): string {
  let timeInMs: number;
  switch (timeUnit) {
    case "ms":
      timeInMs = time;
      break;
    case "s":
      timeInMs = time * 1000;
      break;
    case "m":
      timeInMs = time * 1000 * 60;
      break;
    case "h":
      timeInMs = time * 1000 * 60 * 60;
      break;
    case "d":
      timeInMs = time * 1000 * 60 * 60 * 24;
      break;
    case "w":
      timeInMs = time * 1000 * 60 * 60 * 24 * 7;
      break;
    case "mo":
      timeInMs = time * 1000 * 60 * 60 * 24 * 30; // Approximate month
      break;
    case "y":
      timeInMs = time * 1000 * 60 * 60 * 24 * 365; // Approximate year
      break;
    default:
      timeInMs = 0;
  }

  if (timeInMs < 1000) return `${timeInMs} ms`;

  const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000);

  let result = "";
  if (days > 0) result += `${days}d `;
  if (hours > 0 || days > 0) result += `${hours}h `;
  if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}m `;
  if (seconds > 0 || minutes > 0 || hours > 0 || days > 0)
    result += `${seconds}s`;

  return result.trim() || "0s";
}
