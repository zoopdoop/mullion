import { ipcMain } from "electron";
import { IWrappedMainProcessAction, SendActionFromRendererProcessMessage } from "./lib/electron-context-bridge";
import {
  closeBrowserView,
  closeWindow,
  createBrowserView,
  hideBrowserView,
  mullionWindows,
  navigateToUrl,
  setBrowserView,
} from "./window-manager";

export const addIPCMainListeners = (): void => {
  ipcMain.on(SendActionFromRendererProcessMessage as any, (e, wrappedAction: IWrappedMainProcessAction) => {
    console.log("GOT", SendActionFromRendererProcessMessage, wrappedAction);
    const { windowId, action } = wrappedAction;
    const mullionWindow = mullionWindows.get(windowId);

    if (!mullionWindow) {
      console.error("Unknown window id", windowId);
      return;
    }

    switch (action.type) {
      case "createBrowserView":
        createBrowserView(mullionWindow, action.value);
        break;

      case "setBrowserView":
        setBrowserView(mullionWindow, action.value);
        break;

      case "hideBrowserView":
        hideBrowserView(mullionWindow, action.value);
        break;

      case "closeBrowserView":
        closeBrowserView(mullionWindow, action.value);
        break;

      case "navigateToUrl":
        navigateToUrl(mullionWindow, action.value);
        break;

      case "closeWindow":
        closeWindow(mullionWindow);
        break;
    }
  });
};
