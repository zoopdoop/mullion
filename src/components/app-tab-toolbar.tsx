import { app } from "electron"
import React from "react"
import { IAppTab } from "../models/app-tab"
import PaneNavigation from "./pane-navigation"

interface Props {
  appTab: IAppTab
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const AppTabToolbar: React.FC<Props> = ({ appTab, navigateToUrl }) => {
  return (
    <div className="app-tab-toolbar">
      <PaneNavigation appTab={appTab} navigateToUrl={navigateToUrl} />
    </div>
  )
}

export default AppTabToolbar
