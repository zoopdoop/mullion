import React from "react"
import { render } from "react-dom"
import { INTERNAL_START_URL, isInternalUrl } from "../lib/internal-urls"
import { IAppTab } from "../models/app-tab"
import InternalStartPane from "./internal-panes/internal-start-pane"
import InternalUnknownPane from "./internal-panes/internal-unknown-pane"

interface Props {
  appTab: IAppTab
  url: string
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const InternalPane: React.FC<Props> = ({appTab, url, navigateToUrl}) => {

  const renderInternalPane = () => {
    switch (url) {
      case INTERNAL_START_URL:
        return <InternalStartPane appTab={appTab} navigateToUrl={navigateToUrl} />

      default:
        return <InternalUnknownPane appTab={appTab} url={url} />
    }
  }

  return (
    <div className="internal-pane">
      {renderInternalPane()}
    </div>
  )
}

export default InternalPane
