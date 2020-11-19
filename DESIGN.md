# Mullion Design Document

Mullion is a dual pane browser with both top level and secondary pane tabs.  It is currently powered by Electron for both speed of development and distribution.  A future goal would be to port it to use the system web browser so that it is more lightweight.  One possibility is to use Go ala https://github.com/webview/webview.

## System Architecture

(this is a brain dump that will be edited later)

Mullion uses Electron's [BrowserView](https://www.electronjs.org/docs/api/browser-view) for each pane.  BrowserViews are created and held in the main rendering process, as required by Electron.  The older `<webview>` tag could be used in the rendering process, which would have made the pane management and layout code easier, but they are marked to be deprecated so `BrowserView` is used.

The main rendering process loads a single html file which is built using Parcel.  In development mode the Parcel server is used to enable hot module reloading (HMR).

**TODO**: currently there is a single index.html file.  This needs to be split into two files so that the CSP settings which are relaxed currently to enable HMR aren't used in the built app.

### React Component Heirarchy

React is used for the app for all UI (except for the BrowserViews).  This the heirarchy:

```
App
  AppTabs
  AppTab
    AppTabToolbar
      PaneNavigation
    PrimaryPane
    Splitter
    SecondaryPane
      SecondaryPaneTabs
      SecondaryPaneTab
      SecondaryPaneTabToolbar
        SecondaryPaneInfo
```


