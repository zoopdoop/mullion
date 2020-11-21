import React, { useContext, useEffect, useRef } from "react"
import { addAndSelectSecondaryTabAction } from "../stores/tabs-actions"
import { useClientRect } from "../hooks/use-client-rect"
import { IAppTab } from "../stores/tabs-models"
import { RootStoreContext } from "../stores/root-store"

interface Props {
  appTab: IAppTab
  url: string
  visible: boolean
  isPrimary: boolean
}

const DummyPane: React.FC<Props> = ({ appTab, url, visible, isPrimary }) => {
  const { dispatch } = useContext(RootStoreContext)
  const containerRef = useRef<HTMLDivElement|null>(null)
  const clientRect = useClientRect(containerRef)

  const handleOnClick = () => dispatch(addAndSelectSecondaryTabAction(appTab, {url: "http://example.com"}))

  useEffect(() => {
    if (visible) {
      // TODO: report rect
    }
  }, [visible, clientRect]);

  return (
    <div className="dummy-pane" ref={containerRef} onClick={handleOnClick}>
      {url}
    </div>
  )
}

export default DummyPane
