import React, { useContext, useEffect, useRef } from "react"
import { navigateToUrlAction } from "../../actions/tab-actions"
import { generateSearchUrl } from "../../lib/generate-search-url"
import { IAppTab } from "../../stores/tab-models"
import { RootStoreContext } from "../../stores/root-store"

interface Props {
  appTab: IAppTab
}

const InternalStartPane: React.FC<Props> = ({appTab}) => {
  const { dispatch } = useContext(RootStoreContext)
  const searchRef = useRef<HTMLInputElement|null>(null)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        dispatch(navigateToUrlAction(appTab, generateSearchUrl("google", searchRef.current?.value)))
        break;

      case "Escape":
        if (searchRef.current) {
          searchRef.current.value = ""
        }
        break;
    }
  }

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [searchRef.current])

  return (
    <div className="internal-start-pane">
      <div>
        <h1>Mullion</h1>
      </div>
      <div>
        <input type="text" spellCheck={false} placeholder="Search via Google ..." ref={searchRef} onKeyDown={handleKeyDown} />
      </div>
    </div>
  )
}

export default InternalStartPane
