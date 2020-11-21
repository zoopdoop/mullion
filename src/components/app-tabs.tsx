import React from "react"
import { IAppTab } from "../models/app-tab"
import { Id } from "../models/generic-types"
import AppTab from "./app-tab"

interface Props {
  appTabs: IAppTab[]
  selectedAppTabId: Id
}

const AppTabs: React.FC<Props> = ({ appTabs, selectedAppTabId }) => {
  return (
    <div className="app-tabs">
      {appTabs.map(appTab => <AppTab key={appTab.id} appTab={appTab} visible={appTab.id === selectedAppTabId} />)}
    </div>
  )
}

export default AppTabs
