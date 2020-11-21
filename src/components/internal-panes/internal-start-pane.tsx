import React, { useContext, useEffect, useRef } from "react"
import { AppStateStoreContext, navigateToUrlAction } from "../../hooks/use-app-state"
import { generateSearchUrl } from "../../lib/generate-search-url"
import { IAppTab } from "../../models/app-tab"

interface Props {
  appTab: IAppTab
}

const InternalStartPane: React.FC<Props> = ({appTab}) => {
  const { dispatch } = useContext(AppStateStoreContext)
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
