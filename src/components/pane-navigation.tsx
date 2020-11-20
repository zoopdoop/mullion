import React from "react"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
}

const PaneNavigation: React.FC<Props> = ({ appTab }) => {
  return (
    <div className="pane-navigation">
      <div>
        <input type="text" defaultValue={appTab?.primaryUrl} spellCheck={false} />
      </div>
    </div>
  )
}

export default PaneNavigation
