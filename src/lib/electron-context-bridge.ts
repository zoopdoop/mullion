export interface IElectronContextBridge {
  onMainProcessMessage: (callback: (message: string, ...args: any[]) => void) => void
  // ipcRenderer: {
  //   on: (message: string, callback: (event: Electron.IpcRendererEvent, ...args: any[]) => void) => void
  // }
}