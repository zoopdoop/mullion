import React, { useEffect } from "react"
import AppTabBar from "./app-tab-bar"
import AppTabs from "./app-tabs"

import { useRootStore } from "../hooks/use-root-store";
import { RootStoreContext } from "../stores/root-store";
import { useElectronContextBridgeRef } from "../hooks/use-electron-context-bridge-ref";

interface Props {}

const App: React.FC<Props> = () => {
  const rootStore = useRootStore()
  const {state: {tabs: {appTabs, selectedAppTabId}}, dispatch} = rootStore
  const electronContextBridgeRef = useElectronContextBridgeRef()

  useEffect(() => {
    if (electronContextBridgeRef.current) {
      electronContextBridgeRef.current.onActionFromMainProcess(dispatch)
    }
  }, [electronContextBridgeRef.current])

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
