import { app, BrowserWindow, ipcMain, BrowserView } from "electron";
import * as path from "path";
import { SendActionFromMainProcessMessage, SendActionFromRendererProcessMessage } from "./lib/electron-context-bridge";
import { IRendererAction } from "./actions/renderer-actions";
import {
  addAndSelectAppTabAction,
  addAndSelectSecondaryTabAction,
  testSecondaryLinkFromPrimary,
} from "./actions/tab-actions";
import { IMainProcessActions } from "./actions/main-process-actions";
import { Id } from "./stores/generic-types";

const isDev = require("electron-is-dev"); // eslint-disable-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires

const browserViews: Record<string, BrowserView> = {};
let primaryBrowserViewId: Id | null = null;
let secondaryBrowserViewId: Id | null = null;

const EmptyBounds: Electron.Rectangle = { x: 0, y: 0, width: 0, height: 0 };

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(app.getAppPath(), "preload.js"),
    },
    width: 800,
    // autoHideMenuBar: true
  });
  // mainWindow.setMenu(null)

  const sendActionToRenderer = (action: IRendererAction) => {
    mainWindow.webContents.send(SendActionFromMainProcessMessage, action);
  };

  const googleRegEx = new RegExp("^https://www.google.com/search?");

  ipcMain.on(SendActionFromRendererProcessMessage as any, (e, action: IMainProcessActions) => {
    console.log("GOT", SendActionFromRendererProcessMessage, action);
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
        browserViews[browserViewId] = browserView;
        mainWindow.addBrowserView(browserView);
        break;

      case "setBrowserView":
        browserViewId = action.value.browserViewId;
        id = action.value.primary ? primaryBrowserViewId : secondaryBrowserViewId;
        if (id) {
          browserView = browserViews[id];
          browserView?.setBounds(EmptyBounds);
        }
        browserView = browserViews[browserViewId];
        if (browserView) {
          if (action.value.primary) {
            primaryBrowserViewId = browserViewId;
          } else {
            secondaryBrowserViewId = browserViewId;
          }
          if (action.value.bounds) {
            browserView.setBounds(action.value.bounds);
          }
        }
        break;

      case "hideBrowserView":
        id = action.value.primary ? primaryBrowserViewId : secondaryBrowserViewId;
        if (id) {
          browserView = browserViews[id];
          browserView?.setBounds(EmptyBounds);
        }
        break;

      case "closeBrowserView":
        browserView = browserViews[action.value.browserViewId];
        if (browserView) {
          delete browserViews[action.value.browserViewId];
          mainWindow.removeBrowserView(browserView);
          if (action.value.browserViewId === primaryBrowserViewId) {
            primaryBrowserViewId = null;
          } else if (action.value.browserViewId === secondaryBrowserViewId) {
            secondaryBrowserViewId = null;
          }
        }
        break;

      case "navigateToUrl":
        browserView = browserViews[action.value.browserViewId];
        if (browserView) {
          browserView.webContents.loadURL(action.value.url).catch(console.error);
        }
        break;
    }
  });

  mainWindow.webContents.on("before-input-event", (e, input) => {
    if (input.control) {
      const key = input.key.toLowerCase();
      switch (key) {
        case "n":
          sendActionToRenderer(addAndSelectAppTabAction());
          break;
        default:
          return;
      }
      e.preventDefault();
    }
  });

  mainWindow
    .loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../dist/index.html")}`)
    .catch(console.error);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    createWindow();

    app.on("activate", () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  })
  .catch(console.error);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
