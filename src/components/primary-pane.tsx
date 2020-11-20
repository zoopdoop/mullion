import React from "react"
import { isInternalUrl } from "../lib/internal-urls"
import { IAppTab } from "../models/app-tab"
import DummyPane from "./dummy-pane"
import InternalPane from "./internal-pane"

interface Props {
  appTab: IAppTab
  url: string
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const PrimaryPane: React.FC<Props> = ({appTab, url, navigateToUrl}) => {

  const renderPane = () => {
    if (isInternalUrl(url)) {
      return <InternalPane appTab={appTab} url={url} navigateToUrl={navigateToUrl} />
    }
    return <DummyPane appTab={appTab} url={url} />
  }

  return (
    <div className="primary-pane">
      {renderPane()}
    </div>
  )
}

export default PrimaryPane
