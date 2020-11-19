import React from "react"
import AppTab from "./app-tab"

interface Props {}

const AppTabs: React.FC<Props> = () => {
  return (
    <div className="app-tabs">
      <AppTab />
    </div>
  )
}

export default AppTabs
