import React, { useContext, useEffect, useRef, useState } from "react";
import { navigateToUrlAction } from "../actions/tab-actions";
import { generateSearchUrl } from "../lib/generate-search-url";
import { IAppTab, ISecondaryTab } from "../stores/tab-models";
import { RootStoreContext } from "../stores/root-store";

interface Props {
  tab: IAppTab | ISecondaryTab;
}

const PaneNavigation: React.FC<Props> = ({ tab }) => {
  const { dispatch } = useContext(RootStoreContext);
  const [inputValue, setInputValue] = useState(tab.url || "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        dispatch(navigateToUrlAction(tab, generateSearchUrl("google", inputValue.trim())));
        break;
      case "Escape":
        setInputValue(tab.url || "");
        break;
    }
  };

  useEffect(() => {
    setInputValue(tab.url || "");
  }, [tab.url]);

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
  );
};

export default PaneNavigation;
