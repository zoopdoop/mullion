import React from "react"
import PaneNavigation from "./pane-navigation"

interface Props {}

const AppTabToolbar: React.FC<Props> = () => {
  return (
    <div className="app-tab-toolbar">
      <PaneNavigation />
    </div>
  )
}

export default AppTabToolbar
