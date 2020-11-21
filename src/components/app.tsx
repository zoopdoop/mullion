import React, { useEffect } from "react"
import AppTabBar from "./app-tab-bar"
import AppTabs from "./app-tabs"

import { useRootStore } from "../hooks/use-root-store";
import { useElectronContextBridge } from "../hooks/use-electron-context-bridge";
import { RootStoreContext } from "../stores/root-store";
import { addAndSelectAppTabAction } from "../stores/tabs-actions";

interface Props {}

const App: React.FC<Props> = () => {
  const electronContextBridge = useElectronContextBridge()
  const rootStore = useRootStore()
  const {state: {tabs: {appTabs, selectedAppTabId}}, dispatch} = rootStore

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
    <RootStoreContext.Provider value={rootStore}>
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
    </RootStoreContext.Provider>
  )
}

export default App
