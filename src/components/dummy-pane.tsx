import React, { useEffect, useRef } from "react"
import { useClientRect } from "../hooks/use-client-rect"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
  url: string
  visible: boolean
  isPrimary: boolean
}

const DummyPane: React.FC<Props> = ({ appTab, url, visible, isPrimary }) => {
  const containerRef = useRef<HTMLDivElement|null>(null)
  const clientRect = useClientRect(containerRef)

  useEffect(() => {
    if (visible) {
      // TODO: report rect
      console.log(`show ${isPrimary ? "primary" : "secondary"}`, {appTabId: appTab.id, clientRect})
    }
  }, [visible, clientRect]);

  return (
    <div className="dummy-pane" ref={containerRef}>
      {url}
    </div>
  )
}

export default DummyPane
