import React, { useEffect, useReducer, useState } from "react"
import AppTabBar from "./app-tab-bar"
import AppTabs from "./app-tabs"

import { useAppStateStore, AppStateStoreContext, addAndSelectAppTabAction } from "../hooks/use-app-state";
import { useElectronContextBridge } from "../hooks/use-electron-context-bridge";

interface Props {}

const App: React.FC<Props> = () => {
  const electronContextBridge = useElectronContextBridge()
  const appStateStore = useAppStateStore()
  const {appState: {appTabs, selectedAppTabId}, dispatch} = appStateStore

  useEffect(() => {
    if (electronContextBridge) {
      electronContextBridge.onMainProcessMessage((message: string) => {
        switch (message) {
          case "add-new-tab":
            dispatch(addAndSelectAppTabAction())
            break
        }
      })
    }
  }, [electronContextBridge])

  return (
    <AppStateStoreContext.Provider value={appStateStore}>
      <div className="app">
        <AppTabBar
          tabs={appTabs}
          selectedAppTabId={selectedAppTabId}
        />
        <AppTabs
          appTabs={appTabs}
          selectedAppTabId={selectedAppTabId}
        />
      </div>
    </AppStateStoreContext.Provider>
  )
}

export default App
