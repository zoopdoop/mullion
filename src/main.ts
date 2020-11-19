import { app, BrowserWindow, BrowserView } from "electron";
import * as path from "path";

const isDev = require("electron-is-dev")

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    webPreferences: {
      worldSafeExecuteJavaScript: true,
      contextIsolation: true
    },
    width: 800,
  });

  /*
  // proof of concept with two pane Google search

  let twoPanes = false
  const layout = () => {
    setTimeout(() => {
      const bounds = mainWindow.getBounds()
      const {width, height} = bounds
      const halfWidth = Math.round(width / 2)
      if (twoPanes) {
        leftView.setBounds({x: 0, y: 0, width: halfWidth, height})
        rightView.setBounds({x: halfWidth, y: 0, width: bounds.width - halfWidth, height})
      } else {
        leftView.setBounds({x: 0, y: 0, width, height})
        rightView.setBounds({x: 0, y: 0, width: 0, height: 0})
      }
    }, 0)
  }

  const leftView = new BrowserView();
  const rightView = new BrowserView();
  mainWindow.addBrowserView(leftView);
  mainWindow.addBrowserView(rightView);
  leftView.setBounds({x: 0, y: 0, width: 0, height: 0});
  leftView.webContents.loadURL("https://www.google.com/");
  rightView.setBounds({x: 0, y: 0, width: 0, height: 0});
  layout()

  const googleRegEx = new RegExp("^https://www.google.com/search?")
  leftView.webContents.addListener("will-navigate", (e, url) => {
    if (googleRegEx.test(url)) {
      leftView.webContents.loadURL(url);
    } else {
      rightView.webContents.loadURL(url);
      twoPanes = true
    }
    layout()
    e.preventDefault()
  })

  mainWindow.on("resize", () => layout())
  */

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

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
