import { contextBridge, ipcRenderer } from "electron";
import {
  SendActionFromMainProcessMessage,
  SendActionFromRendererProcessMessage,
  IElectronContextBridge,
  IWrappedMainProcessAction,
} from "./lib/electron-context-bridge";
import { IRendererAction } from "./actions/renderer-actions";
import { IMainProcessActions } from "./actions/main-process-actions";
import { getWindowId } from "./lib/preload-args";

const windowId = getWindowId() || "unknown";

const electronContextBridge: IElectronContextBridge = {
  onActionFromMainProcess: (callback: (action: IRendererAction) => void) => {
    ipcRenderer.on(SendActionFromMainProcessMessage, (e, action) => callback(action));
  },
  sendActionToMainProcess: (action: IMainProcessActions) => {
    const wrappedAction: IWrappedMainProcessAction = { windowId, action };
    ipcRenderer.send(SendActionFromRendererProcessMessage, wrappedAction);
  },
};

contextBridge.exposeInMainWorld("electron", electronContextBridge);
