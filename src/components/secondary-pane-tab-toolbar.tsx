import React from "react"
import SecondaryPaneInfo from "./secondary-pane-info"

interface Props {}

const SecondaryPaneTabToolbar: React.FC<Props> = () => {
  return (
    <div className="secondary-pane-tab-toolbar">
      <SecondaryPaneInfo />
    </div>
  )
}

export default SecondaryPaneTabToolbar
