import React from "react"
import { INTERNAL_START_URL, isInternalUrl } from "../lib/internal-urls"
import { IAppTab } from "../models/app-tab"
import DummyPane from "./dummy-pane"
import InternalPane from "./internal-pane"

interface Props {
  appTab: IAppTab
  visible: boolean
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const PrimaryPane: React.FC<Props> = ({appTab, visible, navigateToUrl}) => {
  const renderPane = () => {
    const url = appTab.primaryUrl || INTERNAL_START_URL
    if (isInternalUrl(url)) {
      return <InternalPane appTab={appTab} url={url} navigateToUrl={navigateToUrl} />
    }
    return <DummyPane appTab={appTab} url={url} visible={visible} isPrimary={true} />
  }

  return (
    <div className="primary-pane">
      {renderPane()}
    </div>
  )
}

export default PrimaryPane
