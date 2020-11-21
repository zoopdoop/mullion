export const INTERNAL_START_URL = "mullion://start";

export const isInternalUrl = (url: string) => /^mullion:\/\//.test(url);
