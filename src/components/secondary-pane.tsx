import React from "react"
import SecondaryPaneTabBar from "./secondary-pane-tab-bar.tsx"
import SecondaryPaneTabs from "./secondary-pane-tabs"

interface Props {}

const SecondaryPane: React.FC<Props> = () => {
  return (
    <div className="secondary-pane">
      <SecondaryPaneTabBar />
      <SecondaryPaneTabs />
    </div>
  )
}

export default SecondaryPane
