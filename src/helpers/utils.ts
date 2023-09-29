import { v4 as uuidv4 } from 'uuid';
import { nanoid } from 'nanoid';

export const generateUUID = (): string => uuidv4();

export const isValidUrl = (url: string): boolean =>
  /^https:\/\/[^\s/$.?#].[^\s]*$/.test(url);

export const isTinyUrl = (url: string): boolean =>
  /^https:\/\/sheygs\.io\/[a-zA-Z0-9]+$/.test(url);

export const generateTinyUrl = (): string => `https://sheygs.io/${nanoid(6)}`;
