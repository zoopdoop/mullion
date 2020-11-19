import React from "react"
import PrimaryPane from "./primary-pane"
import Splitter from "./splitter"
import SecondaryPane from "./secondary-pane"

interface Props {}

const AppTabPanes: React.FC<Props> = () => {
  return (
    <div className="app-tab-panes">
      <PrimaryPane />
      <Splitter />
      <SecondaryPane />
    </div>
  )
}

export default AppTabPanes
