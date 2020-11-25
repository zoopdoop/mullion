import { contextBridge, ipcRenderer } from "electron";
import {
  SendActionFromMainProcessMessage,
  SendActionFromRendererProcessMessage,
  IElectronContextBridge,
} from "./lib/electron-context-bridge";
import { IRendererAction } from "./actions/renderer-actions";
import { IMainProcessActions } from "./actions/main-process-actions";

const electronContextBridge: IElectronContextBridge = {
  onActionFromMainProcess: (callback: (action: IRendererAction) => void) => {
    ipcRenderer.on(SendActionFromMainProcessMessage, (e, action) => callback(action));
  },
  sendActionToMainProcess: (action: IMainProcessActions) => {
    ipcRenderer.send(SendActionFromRendererProcessMessage, action);
  },
};

contextBridge.exposeInMainWorld("electron", electronContextBridge);
