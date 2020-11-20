import { contextBridge, ipcRenderer } from "electron"
import { IElectronContextBridge } from "./lib/electron-context-bridge"

const electronContextBridge: IElectronContextBridge = {
  onMainProcessMessage: (callback: (...args: any[]) => void) => {
    ipcRenderer.on("main-process-message", (e, args) => callback(args))
  },
  // ipcRenderer: {
  //   on: (message: string, callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => ipcRenderer.on(message, callback)
  // }
}

contextBridge.exposeInMainWorld("electron", electronContextBridge)
