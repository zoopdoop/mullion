import { BrowserWindow, BrowserView, app, ipcMain } from "electron";
import * as path from "path";
import { IBounds } from "./actions/main-process-actions";

import { IRendererAction } from "./actions/renderer-actions";
import {
  addAndSelectAppTabAction,
  browserViewEventAction,
  ITabAction,
  testSecondaryLinkFromPrimary,
} from "./actions/tab-actions";
import { SendActionFromMainProcessMessage } from "./lib/electron-context-bridge";
import getId from "./lib/get-id";
import { isInternalUrl } from "./lib/internal-urls";
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
  webContents.send(SendActionFromMainProcessMessage, action);
};

export const addKeyBoardShortcuts = (
  fromWebContents: Electron.WebContents,
  toWebContents?: Electron.WebContents
): void => {
  const sendToWebContents = toWebContents || fromWebContents;
  fromWebContents.on("before-input-event", (e, input) => {
    if (input.control && input.type === "keyDown") {
      let preventDefault = true;
      switch (input.key.toLowerCase()) {
        case "n":
          createMullionWindow();
          break;
        case "t":
          sendActionToRenderer(sendToWebContents, addAndSelectAppTabAction());
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

export const addBrowserViewEvents = (
  mullionWindow: IMullionWindow,
  browserView: BrowserView,
  options: { browserViewId: Id; primary: boolean }
): void => {
  const { webContents } = browserView;
  const { browserViewId, primary } = options;

  const sendActionToMullionWindow = (action: ITabAction) =>
    sendActionToRenderer(mullionWindow.browserWindow.webContents, action);

  // if true loading events are ignored on the next load.  Used when opening a secondary link so the primary browser doesn't update the loader state.
  let ignoreNextLoad = false;

  // possible events to listen to:
  // did-finish-load did-fail-load page-title-updated page-favicon-updated new-window will-prevent-unload render-process-gone unresponsive responsive certificate-error login
  // media-started-playing media-paused update-target-url context-menu select-bluetooth-device console-message
  webContents.on("will-navigate", (e, url) => {
    const openInSecondaryWindow = primary && !googleRegEx.test(url);
    ignoreNextLoad = openInSecondaryWindow;
    if (openInSecondaryWindow) {
      sendActionToMullionWindow(testSecondaryLinkFromPrimary(browserViewId, { url }));
      e.preventDefault();
    } else {
      sendActionToMullionWindow(browserViewEventAction(browserViewId, { name: "will-navigate", url }));
    }
  });
  webContents.on("did-start-loading", () => {
    if (!ignoreNextLoad) {
      sendActionToMullionWindow(browserViewEventAction(browserViewId, { name: "did-start-loading" }));
    }
  });
  webContents.on("did-stop-loading", () =>
    sendActionToMullionWindow(browserViewEventAction(browserViewId, { name: "did-stop-loading" }))
  );
  webContents.on("did-navigate", (e, url, httpResponseCode) =>
    sendActionToMullionWindow(browserViewEventAction(browserViewId, { name: "did-navigate", url, httpResponseCode }))
  );
};

export const createBrowserView = (
  mullionWindow: IMullionWindow,
  options: { browserViewId: Id; primary: boolean }
): void => {
  const { browserViewId } = options;
  const browserView = new BrowserView();
  addBrowserViewEvents(mullionWindow, browserView, options);
  addKeyBoardShortcuts(browserView.webContents, mullionWindow.browserWindow.webContents);
  browserView.setBounds(EmptyBounds);
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
  console.log("navigateToUrl", options);
  if (browserView) {
    if (isInternalUrl(url)) {
      sendActionToRenderer(
        mullionWindow.browserWindow.webContents,
        browserViewEventAction(browserViewId, { name: "will-navigate", url })
      );
    } else {
      browserView.webContents.loadURL(url).catch(console.error);
    }
  }
};

export const closeWindow = (mullionWindow: IMullionWindow): void => {
  mullionWindow.browserWindow.close();
};

export const reload = (mullionWindow: IMullionWindow, options: { browserViewId: Id }): void => {
  const { browserViewId } = options;
  const browserView = mullionWindow.browserViews[browserViewId];
  if (browserView) {
    browserView.webContents.reload();
  }
};

export const stop = (mullionWindow: IMullionWindow, options: { browserViewId: Id }): void => {
  const { browserViewId } = options;
  const browserView = mullionWindow.browserViews[browserViewId];
  if (browserView) {
    browserView.webContents.stop();
  }
};
