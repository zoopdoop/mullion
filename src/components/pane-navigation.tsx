import React, { useEffect, useRef, useState } from "react"
import { generateSearchUrl } from "../lib/generate-search-url"
import { IAppTab } from "../models/app-tab"

interface Props {
  appTab: IAppTab
  navigateToUrl: (appTab: IAppTab, url: string) => void
}

const PaneNavigation: React.FC<Props> = ({ appTab, navigateToUrl }) => {
  const [inputValue, setInputValue] = useState(appTab.primaryUrl || "")
  const inputRef = useRef<HTMLInputElement|null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        navigateToUrl(appTab, generateSearchUrl("google", inputValue.trim()))
        break;
      case 'Escape':
        setInputValue(appTab.primaryUrl || "")
        break;
    }
  }

  useEffect(() => {
    setInputValue(appTab.primaryUrl || "")
  }, [appTab.primaryUrl])

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
