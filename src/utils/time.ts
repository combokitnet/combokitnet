export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;
export const MONTH = 30 * DAY;
export const YEAR = 365 * DAY;

export const delayTPS = async (tps: number) => {
    return delay(1000 / tps)
};

export const delay = async (delayTime: number) => {
    return new Promise(resolve => setTimeout(resolve, delayTime));
};