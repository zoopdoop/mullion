import { app, BrowserWindow } from "electron";
import { setupIPCMainListeners } from "./ipc-main";
import { createMullionWindow } from "./window-manager";

app
  .whenReady()
  .then(() => {
    setupIPCMainListeners();

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
