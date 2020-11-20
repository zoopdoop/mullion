import React, { useState } from "react"
import AppTabBar from "./app-tab-bar"
import AppTabs from "./app-tabs"

import { useAppState } from "../hooks/use-app-state";

interface Props {}

const App: React.FC<Props> = () => {
  const {appTabs, addAppTab, selectedAppTab, selectAppTab, closeAppTab} = useAppState();

  return (
    <div className="app">
      <AppTabBar
        tabs={appTabs}
        selectedAppTab={selectedAppTab}
        addAppTab={addAppTab} 
        selectAppTab={selectAppTab}
        closeAppTab={closeAppTab}
      />
      <AppTabs appTabs={appTabs} selectedAppTab={selectedAppTab} />
    </div>
  )
}

export default App
