import React from "react"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
  url: string
}

const DummyPane: React.FC<Props> = ({ appTab, url }) => {
  return (
    <div className="dummy-pane">
      {url}
    </div>
  )
}

export default DummyPane
