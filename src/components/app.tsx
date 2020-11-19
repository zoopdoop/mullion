import React from "react"
import AppTabBar from "./app-tab-bar"
import AppTabs from "./app-tabs"

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="app">
      <AppTabBar />
      <AppTabs />
    </div>
  )
}

export default App
