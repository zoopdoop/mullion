export const INTERNAL_START_URL = "mullion://start";

export const isInternalUrl = (url: string): string => /^mullion:\/\//.test(url);
