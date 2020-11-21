import React, { useEffect } from "react"
import PrimaryPane from "./primary-pane"
import Splitter from "./splitter"
import SecondaryPane from "./secondary-pane"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
  visible: boolean
}

const AppTabPanes: React.FC<Props> = ({ appTab, visible }) => {

  useEffect(() => {
    if (visible && (appTab.secondaryUrls.length === 0)) {
      // TODO: report secondary pane hidden
      console.log("hide secondary", {appTabId: appTab.id})
    }
  }, [appTab.secondaryUrls, visible])

  const renderPanes = () => {
    if (appTab.secondaryUrls.length === 0) {
      return <PrimaryPane appTab={appTab} visible={visible} />
    }

    return (
      <>
        <PrimaryPane appTab={appTab} visible={visible} />
        <Splitter />
        <SecondaryPane />
      </>
    )    
  }

  return (
    <div className="app-tab-panes">
      {renderPanes()}
    </div>
  )
}

export default AppTabPanes
