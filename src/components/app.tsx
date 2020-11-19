import React from "react"
import AppTabs from "./app-tabs"
import Pane from "./pane"

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className="app">
      <AppTabs />
      <Pane />
    </div>
  )
}

export default App
