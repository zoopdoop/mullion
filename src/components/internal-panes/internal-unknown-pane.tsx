import React from "react"
import { IAppTab } from "../../models/app-tab"

interface Props {
  appTab: IAppTab
  url: string
}

const InternalUnknownPane: React.FC<Props> = ({appTab, url}) => {

  return (
    <div className="internal-unknown-pane">
      Unknown internal url: {url}
    </div>
  )
}

export default InternalUnknownPane
