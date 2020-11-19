import React from "react"
import AppTabPane from "./app-tab-pane"

interface Props {}

const AppTabPanes: React.FC<Props> = () => {
  return (
    <div className="app-tab-panes">
      <AppTabPane />
    </div>
  )
}

export default AppTabPanes
