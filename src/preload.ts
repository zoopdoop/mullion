import { contextBridge, ipcRenderer } from "electron"
import { ActionFromMainProcessMessage, IElectronContextBridge } from "./lib/electron-context-bridge"
import { IRendererAction } from "./actions/renderer-actions"

const electronContextBridge: IElectronContextBridge = {
  onActionFromMainProcess: (callback: (action: IRendererAction) => void) => {
    ipcRenderer.on(ActionFromMainProcessMessage, (e, action) => callback(action))
  }
}

contextBridge.exposeInMainWorld("electron", electronContextBridge)
