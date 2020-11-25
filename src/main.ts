import { app, BrowserWindow } from "electron";
import { addIPCMainListeners } from "./ipc-main";
import { createMullionWindow } from "./window-manager";

app
  .whenReady()
  .then(() => {
    addIPCMainListeners();

    createMullionWindow();

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMullionWindow();
      }
    });
  })
  .catch(console.error);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
