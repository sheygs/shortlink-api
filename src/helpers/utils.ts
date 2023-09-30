import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

export const generateUUID = (): string => uuidv4();

export const isValidLongUrl = (url: string = ''): boolean => {
  const validUrlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/g;

  return validUrlRegex.test(url);
};

export const isValidShortUrl = (url: string = ''): boolean =>
  /^http(s)?:\/\/sheygs\.io\/[a-zA-Z0-9]+$/.test(url);

export const generateTinyUrl = (): string => `https://sheygs.io/${nanoid(6)}`;

// 6 characters url path
export const isValidUrlPath = (urlPath: string = ''): boolean =>
  /^[A-Za-z0-9_-]{6}$/.test(urlPath);
