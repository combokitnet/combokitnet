export const maxLength = (str: string, len: number = 10) => {
    if (str.length <= len) return str;
    const c = Math.floor((len - 3) / 2);
    return str.slice(0, c) + '...' + str.slice(-c);
}
