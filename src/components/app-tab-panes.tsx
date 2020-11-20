import React, { useEffect } from "react"
import PrimaryPane from "./primary-pane"
import Splitter from "./splitter"
import SecondaryPane from "./secondary-pane"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
  visible: boolean
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const AppTabPanes: React.FC<Props> = ({ appTab, visible, navigateToUrl }) => {

  useEffect(() => {
    if (visible && (appTab.secondaryUrls.length === 0)) {
      // TODO: report secondary pane hidden
      console.log("hide secondary", {appTabId: appTab.id})
    }
  }, [appTab.secondaryUrls, visible])

  const renderPanes = () => {
    if (appTab.secondaryUrls.length === 0) {
      return <PrimaryPane appTab={appTab} visible={visible} navigateToUrl={navigateToUrl} />
    }

    return (
      <>
        <PrimaryPane appTab={appTab} visible={visible} navigateToUrl={navigateToUrl} />
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
