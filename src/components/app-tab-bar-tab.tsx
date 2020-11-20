import React from "react"
import generateClassName from "../lib/generate-classname"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
  selected: boolean
  selectAppTab: (appTab: IAppTab) => void
  closeAppTab: (appTab: IAppTab) => void
}

const AppTabBarTab: React.FC<Props> = ({ appTab, selected, selectAppTab, closeAppTab }) => {
  const selectTab = () => selectAppTab(appTab)
  const closeTab = (e: React.MouseEvent<HTMLSpanElement>) => {
    closeAppTab(appTab)
    e.stopPropagation()
  }
  const className = generateClassName("app-tab-bar-tab", {selected})
  return (
    <div className={className} tabIndex={0} onClick={selectTab} role="button">
      {appTab.title}
      <span className="close" onClick={closeTab}>×</span>
    </div>
  )
}

export default AppTabBarTab
