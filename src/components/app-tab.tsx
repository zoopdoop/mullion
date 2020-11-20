import React from "react"
import AppTabToolbar from "./app-tab-toolbar"
import AppTabPanes from "./app-tab-panes"
import { IAppTab } from "../models/app-tab"
import generateClassName from "../lib/generate-classname"

interface Props {
  appTab: IAppTab
  visible: boolean
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const AppTab: React.FC<Props> = ({ appTab, visible, navigateToUrl }) => {
  const className = generateClassName("app-tab", {hidden: !visible})
  return (
    <div className={className}>
      <AppTabToolbar appTab={appTab} navigateToUrl={navigateToUrl} />
      <AppTabPanes appTab={appTab} navigateToUrl={navigateToUrl} visible={visible} />
    </div>
  )
}

export default AppTab
