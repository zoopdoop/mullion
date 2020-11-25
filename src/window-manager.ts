import { BrowserWindow, BrowserView, app, ipcMain } from "electron";
import * as path from "path";
import { IBounds } from "./actions/main-process-actions";

import { IRendererAction } from "./actions/renderer-actions";
import { addAndSelectAppTabAction, testSecondaryLinkFromPrimary } from "./actions/tab-actions";
import { SendActionFromMainProcessMessage } from "./lib/electron-context-bridge";
import getId from "./lib/get-id";
import { getPreloadArgs } from "./lib/preload-args";
import { Id } from "./stores/generic-types";

const isDev = require("electron-is-dev"); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires

export interface IMullionWindow {
  id: Id;
  browserWindow: BrowserWindow;
  browserViews: Record<string, BrowserView>;
  primaryBrowserViewId?: Id;
  secondaryBrowserViewId?: Id;
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

  const mullionWindow: IMullionWindow = {
    id: windowId,
    browserWindow,
    browserViews: {},
    primaryBrowserViewId: undefined,
    secondaryBrowserViewId: undefined,
  };
  mullionWindows.set(windowId, mullionWindow);

  addKeyBoardShortcuts(browserWindow.webContents);

  browserWindow.on("close", () => {
    browserWindow.getBrowserViews().forEach(browserView => {
      browserWindow.removeBrowserView(browserView);
      browserView.destroy();
    });
    mullionWindow.browserViews = {};
    mullionWindow.primaryBrowserViewId = undefined;
    mullionWindow.secondaryBrowserViewId = undefined;
    mullionWindows.delete(mullionWindow.id);
  });

  browserWindow
    .loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`)
    .catch(console.error);
};

const sendActionToRenderer = (webContents: Electron.WebContents, action: IRendererAction) => {
  console.log("SENDING", action);
  webContents.send(SendActionFromMainProcessMessage, action);
};

export const addKeyBoardShortcuts = (webContents: Electron.WebContents): void => {
  webContents.on("before-input-event", (e, input) => {
    if (input.control && input.type === "keyDown") {
      let preventDefault = true;
      switch (input.key.toLowerCase()) {
        case "n":
          createMullionWindow();
          break;
        case "t":
          sendActionToRenderer(webContents, addAndSelectAppTabAction());
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

const googleRegEx = new RegExp("^https://www.google.com/search?");
const EmptyBounds: Electron.Rectangle = { x: 0, y: 0, width: 0, height: 0 };

export const createBrowserView = (
  mullionWindow: IMullionWindow,
  options: { browserViewId: Id; primary: boolean }
): void => {
  const { browserViewId, primary } = options;
  const browserView = new BrowserView();
  if (primary) {
    browserView.webContents.addListener("will-navigate", (e, url) => {
      if (!googleRegEx.test(url)) {
        sendActionToRenderer(
          mullionWindow.browserWindow.webContents,
          testSecondaryLinkFromPrimary(browserViewId, { url })
        );
        e.preventDefault();
      }
    });
  }
  browserView.setBounds(EmptyBounds);
  addKeyBoardShortcuts(browserView.webContents);
  mullionWindow.browserViews[browserViewId] = browserView;
  mullionWindow.browserWindow.addBrowserView(browserView);
};

export const setBrowserView = (
  mullionWindow: IMullionWindow,
  options: { browserViewId: Id; primary: boolean; bounds?: IBounds }
): void => {
  const { browserViewId, primary, bounds } = options;
  hideBrowserView(mullionWindow, options);
  const browserView = mullionWindow.browserViews[browserViewId];
  if (browserView) {
    if (primary) {
      mullionWindow.primaryBrowserViewId = browserViewId;
    } else {
      mullionWindow.secondaryBrowserViewId = browserViewId;
    }
    if (bounds) {
      browserView.setBounds(bounds);
    }
  }
};

export const hideBrowserView = (mullionWindow: IMullionWindow, options: { primary: boolean }): void => {
  const browserViewId = options.primary ? mullionWindow.primaryBrowserViewId : mullionWindow.secondaryBrowserViewId;
  if (browserViewId) {
    mullionWindow.browserViews[browserViewId]?.setBounds(EmptyBounds);
  }
};

export const closeBrowserView = (mullionWindow: IMullionWindow, options: { browserViewId: Id }): void => {
  const { browserViewId } = options;
  const browserView = mullionWindow.browserViews[browserViewId];
  if (browserView) {
    delete mullionWindow.browserViews[browserViewId];
    mullionWindow.browserWindow.removeBrowserView(browserView);
    if (browserViewId === mullionWindow.primaryBrowserViewId) {
      mullionWindow.primaryBrowserViewId = undefined;
    } else if (browserViewId === mullionWindow.secondaryBrowserViewId) {
      mullionWindow.secondaryBrowserViewId = undefined;
    }
  }
};

export const navigateToUrl = (mullionWindow: IMullionWindow, options: { browserViewId: Id; url: string }): void => {
  const { browserViewId, url } = options;
  const browserView = mullionWindow.browserViews[browserViewId];
  if (browserView) {
    browserView.webContents.loadURL(url).catch(console.error);
  }
};

export const closeWindow = (mullionWindow: IMullionWindow): void => {
  mullionWindow.browserWindow.close();
};
