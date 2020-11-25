import { BrowserWindow, BrowserView, app, ipcMain } from "electron";
import * as path from "path";

import { IRendererAction } from "./actions/renderer-actions";
import { addAndSelectAppTabAction } from "./actions/tab-actions";
import { SendActionFromMainProcessMessage } from "./lib/electron-context-bridge";
import getId from "./lib/get-id";
import { getPreloadArgs } from "./lib/preload-args";
import { Id } from "./stores/generic-types";

const isDev = require("electron-is-dev"); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires

export interface IMullionWindow {
  id: Id;
  browserWindow: BrowserWindow;
  browserViews: Record<string, BrowserView>;
  primaryBrowserViewId: Id | null;
  secondaryBrowserViewId: Id | null;
}

export const mullionWindows: Map<Id, IMullionWindow> = new Map<Id, IMullionWindow>();

export const createMullionWindow = (): void => {
  const windowId = getId();

  // Create the browser window.
  const browserWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), "preload.js"),
      additionalArguments: getPreloadArgs({ windowId }),
    },
    width: 800,
    // autoHideMenuBar: true
  });
  // mainWindow.setMenu(null)

  const window: IMullionWindow = {
    id: windowId,
    browserWindow,
    browserViews: {},
    primaryBrowserViewId: null,
    secondaryBrowserViewId: null,
  };
  mullionWindows.set(windowId, window);

  addKeyBoardShortcuts(browserWindow.webContents);

  browserWindow
    .loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`)
    .catch(console.error);
};

export const addKeyBoardShortcuts = (webContents: Electron.WebContents): void => {
  const sendActionToRenderer = (action: IRendererAction) => webContents.send(SendActionFromMainProcessMessage, action);

  webContents.on("before-input-event", (e, input) => {
    if (input.control && input.type === "keyDown") {
      let preventDefault = true;
      switch (input.key.toLowerCase()) {
        case "n":
          createMullionWindow();
          break;
        case "t":
          sendActionToRenderer(addAndSelectAppTabAction());
          break;
        default:
          preventDefault = false;
          return;
      }
      if (preventDefault) {
        e.preventDefault();
      }
    }
  });
};
