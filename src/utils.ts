export const validateURL = (url: string): boolean => {
  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  const regex = new RegExp(expression);

  return !!url.match(regex);
};

export const shortenString = (str: string): string => {
  if (str.startsWith("0x")) {
    const length = str.length;
    if (length > 12) {
      return `${str.substring(0, 6)}...${str.substring(
        length - 6,
        length - 1
      )}`;
    } else {
      return str;
    }
  } else {
    const length = str.length;
    if (length > 12) {
      return str.substring(0, 8).concat("...");
    }
    return str;
  }
};
