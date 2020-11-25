import { ipcMain, BrowserView } from "electron";
import { IRendererAction } from "./actions/renderer-actions";
import { testSecondaryLinkFromPrimary } from "./actions/tab-actions";
import {
  IWrappedMainProcessAction,
  SendActionFromMainProcessMessage,
  SendActionFromRendererProcessMessage,
} from "./lib/electron-context-bridge";
import { Id } from "./stores/generic-types";
import { addKeyBoardShortcuts, mullionWindows } from "./window-manager";

const googleRegEx = new RegExp("^https://www.google.com/search?");

const EmptyBounds: Electron.Rectangle = { x: 0, y: 0, width: 0, height: 0 };

export const setupIPCMainListeners = (): void => {
  ipcMain.on(SendActionFromRendererProcessMessage as any, (e, wrappedAction: IWrappedMainProcessAction) => {
    console.log("GOT", SendActionFromRendererProcessMessage, wrappedAction);
    const { windowId, action } = wrappedAction;
    const mullionWindow = mullionWindows.get(windowId);

    if (!mullionWindow) {
      console.error("Unknown window id", windowId);
      return;
    }

    const sendActionToRenderer = (action: IRendererAction) => {
      mullionWindow.browserWindow.webContents.send(SendActionFromMainProcessMessage, action);
    };

    let browserView: BrowserView;
    let browserViewId: Id;
    let id: Id | null;

    switch (action.type) {
      case "createBrowserView":
        browserViewId = action.value.browserViewId;
        browserView = new BrowserView();
        if (action.value.primary) {
          browserView.webContents.addListener("will-navigate", (e, url) => {
            if (!googleRegEx.test(url)) {
              sendActionToRenderer(testSecondaryLinkFromPrimary(browserViewId, { url }));
              e.preventDefault();
            }
          });
        }
        browserView.setBounds(EmptyBounds);
        addKeyBoardShortcuts(browserView.webContents);
        mullionWindow.browserViews[browserViewId] = browserView;
        mullionWindow.browserWindow.addBrowserView(browserView);
        break;

      case "setBrowserView":
        browserViewId = action.value.browserViewId;
        id = action.value.primary ? mullionWindow.primaryBrowserViewId : mullionWindow.secondaryBrowserViewId;
        if (id) {
          browserView = mullionWindow.browserViews[id];
          browserView?.setBounds(EmptyBounds);
        }
        browserView = mullionWindow.browserViews[browserViewId];
        if (browserView) {
          if (action.value.primary) {
            mullionWindow.primaryBrowserViewId = browserViewId;
          } else {
            mullionWindow.secondaryBrowserViewId = browserViewId;
          }
          if (action.value.bounds) {
            browserView.setBounds(action.value.bounds);
          }
        }
        break;

      case "hideBrowserView":
        id = action.value.primary ? mullionWindow.primaryBrowserViewId : mullionWindow.secondaryBrowserViewId;
        if (id) {
          browserView = mullionWindow.browserViews[id];
          browserView?.setBounds(EmptyBounds);
        }
        break;

      case "closeBrowserView":
        browserView = mullionWindow.browserViews[action.value.browserViewId];
        if (browserView) {
          delete mullionWindow.browserViews[action.value.browserViewId];
          mullionWindow.browserWindow.removeBrowserView(browserView);
          if (action.value.browserViewId === mullionWindow.primaryBrowserViewId) {
            mullionWindow.primaryBrowserViewId = null;
          } else if (action.value.browserViewId === mullionWindow.secondaryBrowserViewId) {
            mullionWindow.secondaryBrowserViewId = null;
          }
        }
        break;

      case "navigateToUrl":
        browserView = mullionWindow.browserViews[action.value.browserViewId];
        if (browserView) {
          browserView.webContents.loadURL(action.value.url).catch(console.error);
        }
        break;
    }
  });
};
