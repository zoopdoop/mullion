import React from "react"
import { IAppTab, INewAppTab } from "../models/app-tab"
import AppTabBarTab from "./app-tab-bar-tab"

interface Props {
  tabs: IAppTab[]
  selectedAppTab: IAppTab
  addAppTab: (newTab?: INewAppTab) => IAppTab
  selectAppTab: (appTab: IAppTab) => void
  closeAppTab: (appTab: IAppTab) => void
}

const AppTabBar: React.FC<Props> = ({ tabs, addAppTab, selectAppTab, selectedAppTab, closeAppTab }) => {
  const addTab = () => selectAppTab(addAppTab())
  return (
    <div className="app-tab-bar">
      {tabs.map((tab) => (
        <AppTabBarTab
          key={tab.id}
          appTab={tab}
          selected={tab === selectedAppTab}
          selectAppTab={selectAppTab}
          closeAppTab={closeAppTab} 
        />))}
      <button className="app-tab-bar-add-button" onClick={addTab}>+</button>
    </div>
  )
}

export default AppTabBar
