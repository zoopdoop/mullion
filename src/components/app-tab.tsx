import React from "react"
import AppTabToolbar from "./app-tab-toolbar"
import AppTabPanes from "./app-tab-panes"

interface Props {}

const AppTab: React.FC<Props> = () => {
  return (
    <div className="app-tab">
      <AppTabToolbar />
      <AppTabPanes />
    </div>
  )
}

export default AppTab
