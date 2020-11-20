import React, { useState } from "react"
import AppTabBar from "./app-tab-bar"
import AppTabs from "./app-tabs"

import { useAppState } from "../hooks/use-app-state";

interface Props {}

const App: React.FC<Props> = () => {
  const {appTabs, addAppTab, selectedAppTabId, selectAppTab, closeAppTab, navigateToUrl} = useAppState();

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
