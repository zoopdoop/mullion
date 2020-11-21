import React, { useContext, useEffect, useRef, useState } from "react"
import { AppStateStoreContext, navigateToUrlAction } from "../hooks/use-app-state"
import { generateSearchUrl } from "../lib/generate-search-url"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
}

const PaneNavigation: React.FC<Props> = ({ appTab }) => {
  const { dispatch } = useContext(AppStateStoreContext)
  const [inputValue, setInputValue] = useState(appTab.url || "")
  const inputRef = useRef<HTMLInputElement|null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        dispatch(navigateToUrlAction(appTab, generateSearchUrl("google", inputValue.trim())))
        break;
      case 'Escape':
        setInputValue(appTab.url || "")
        break;
    }
  }

  useEffect(() => {
    setInputValue(appTab.url || "")
  }, [appTab.url])

  return (
    <div className="pane-navigation">
      <div>
        <input
          type="text"
          value={inputValue}
          spellCheck={false}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          ref={inputRef} 
        />
      </div>
    </div>
  )
}

export default PaneNavigation
