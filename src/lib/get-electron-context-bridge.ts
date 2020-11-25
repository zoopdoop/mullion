import { IElectronContextBridge } from "./electron-context-bridge";

export const electronContextBridge = (window as any).electron as IElectronContextBridge | undefined; // eslint-disable-line
