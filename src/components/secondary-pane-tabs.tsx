import React from "react"
import SecondaryPaneTab from "./secondary-pane-tab"
import SecondaryPaneTabToolbar from "./secondary-pane-tab-toolbar"

interface Props {}

const SecondaryPaneTabs: React.FC<Props> = () => {
  return (
    <div className="secondary-pane-tabs">
      <SecondaryPaneTab />
    </div>
  )
}

export default SecondaryPaneTabs
