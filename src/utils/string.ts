export const maxLength = (
  str: string,
  len: number = 10,
  option: "start" | "middle" | "end" = "middle"
) => {
  if (str.length <= len) return str;

  switch (option) {
    case "start":
      return "..." + str.slice(-(len - 3));
    case "end":
      return str.slice(0, len - 3) + "...";
    case "middle":
    default:
      const c = Math.floor((len - 3) / 2);
      return str.slice(0, c) + "..." + str.slice(-c);
  }
};
