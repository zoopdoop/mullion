import { Id } from "../stores/generic-types";

interface IPreloadArgsOptions {
  windowId: Id;
}

const windowIdPrefix = "--mullion-window-id=";
const windowIdPrefixRegExp = new RegExp(`^${windowIdPrefix}(.*)$`);

export const getPreloadArgs = (options: IPreloadArgsOptions): string[] => [`${windowIdPrefix}${options.windowId}`];

export const getWindowId = (): string | undefined => {
  const arg = window.process.argv.find(arg => windowIdPrefixRegExp.test(arg));
  const matches = arg?.match(windowIdPrefixRegExp) || undefined;
  return matches && matches[1];
};
