import React from "react"
import PrimaryPane from "./primary-pane"
import Splitter from "./splitter"
import SecondaryPane from "./secondary-pane"
import { IAppTab } from "../models/app-tab"
import { INTERNAL_START_URL } from "../lib/internal-urls"

interface Props {
  appTab: IAppTab
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const AppTabPanes: React.FC<Props> = ({ appTab, navigateToUrl }) => {

  const renderPanes = () => {
    if (appTab.primaryUrl === null) {
      return <PrimaryPane appTab={appTab} url={INTERNAL_START_URL} navigateToUrl={navigateToUrl} />
    }

    if (appTab.secondaryUrls.length === 0) {
      return <PrimaryPane appTab={appTab} url={appTab.primaryUrl} navigateToUrl={navigateToUrl} />
    }

    return (
      <>
        <PrimaryPane appTab={appTab} url={appTab.primaryUrl} navigateToUrl={navigateToUrl} />
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
