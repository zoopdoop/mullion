import React, { useEffect, useState } from "react"
import AppTabBar from "./app-tab-bar"
import AppTabs from "./app-tabs"

import { useAppState } from "../hooks/use-app-state";
import { useElectronContextBridge } from "../hooks/use-electron-context-bridge";

interface Props {}

const App: React.FC<Props> = () => {
  const {appTabs, addAppTab, selectedAppTabId, selectAppTab, closeAppTab, navigateToUrl} = useAppState();
  const electronContextBridge = useElectronContextBridge()

  useEffect(() => {
    if (electronContextBridge) {
      electronContextBridge.onMainProcessMessage((message: string) => {
        switch (message) {
          case "add-new-tab":
            selectAppTab(addAppTab())
            break
        }
      })
    }
  }, [electronContextBridge])

  return (
    <div className="app">
      <AppTabBar
        tabs={appTabs}
        selectedAppTabId={selectedAppTabId}
        addAppTab={addAppTab} 
        selectAppTab={selectAppTab}
        closeAppTab={closeAppTab}
      />
      <AppTabs
        appTabs={appTabs}
        selectedAppTabId={selectedAppTabId}
        navigateToUrl={navigateToUrl} 
      />
    </div>
  )
}

export default App
