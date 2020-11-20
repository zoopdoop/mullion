import React from "react"
import { IAppTab } from "../models/app-tab"
import AppTab from "./app-tab"

interface Props {
  appTabs: IAppTab[]
  selectedAppTab: IAppTab
}

const AppTabs: React.FC<Props> = ({ appTabs, selectedAppTab }) => {
  return (
    <div className="app-tabs">
      {appTabs.map(appTab => <AppTab key={appTab.id} appTab={appTab} visible={appTab === selectedAppTab} />)}
    </div>
  )
}

export default AppTabs
