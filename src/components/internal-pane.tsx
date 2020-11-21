import React from "react"
import { render } from "react-dom"
import { INTERNAL_START_URL, isInternalUrl } from "../lib/internal-urls"
import { IAppTab } from "../stores/tab-models"
import InternalStartPane from "./internal-panes/internal-start-pane"
import InternalUnknownPane from "./internal-panes/internal-unknown-pane"

interface Props {
  appTab: IAppTab
  url: string
}

const InternalPane: React.FC<Props> = ({appTab, url}) => {

  const renderInternalPane = () => {
    switch (url) {
      case INTERNAL_START_URL:
        return <InternalStartPane appTab={appTab} />

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
