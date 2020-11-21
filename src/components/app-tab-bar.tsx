import React, { useContext } from "react"
import { addAndSelectAppTabAction, closeAppTabAction, selectAppTabAction } from "../stores/app-state-actions"
import { IAppTab } from "../stores/app-state-models"
import { Id } from "../stores/generic-types"
import { AppStateStoreContext } from "../stores/app-state-store"
import AppTabBarTab from "./app-tab-bar-tab"

interface Props {
  tabs: IAppTab[]
  selectedAppTabId: Id
}

const AppTabBar: React.FC<Props> = ({ tabs, selectedAppTabId }) => {
  const { dispatch } = useContext(AppStateStoreContext)

  const addTab = () => dispatch(addAndSelectAppTabAction())
  const selectAppTab = (appTab: IAppTab) => dispatch(selectAppTabAction(appTab))
  const closeAppTab = (appTab: IAppTab) => dispatch(closeAppTabAction(appTab))

  return (
    <div className="app-tab-bar">
      {tabs.map((tab) => (
        <AppTabBarTab
          key={tab.id}
          appTab={tab}
          selected={tab.id === selectedAppTabId}
          selectAppTab={selectAppTab}
          closeAppTab={closeAppTab} 
        />))}
      <button className="app-tab-bar-add-button" onClick={addTab}>+</button>
    </div>
  )
}

export default AppTabBar
