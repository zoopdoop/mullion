import React from "react"
import AppTabToolbar from "./app-tab-toolbar"
import AppTabPanes from "./app-tab-panes"
import { IAppTab } from "../models/app-tab"
import generateClassName from "../lib/generate-classname"

interface Props {
  appTab: IAppTab
  visible: boolean
}

const AppTab: React.FC<Props> = ({ appTab, visible }) => {
  const className = generateClassName("app-tab", {hidden: !visible})
  return (
    <div className={className}>
      <AppTabToolbar appTab={appTab} />
      <AppTabPanes appTab={appTab} visible={visible} />
    </div>
  )
}

export default AppTab
