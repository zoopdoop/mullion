import React, { useContext, useEffect, useRef, useState } from "react";
import {
  goBackAction,
  goForwardAction,
  goHomeAction,
  navigateToUrlAction,
  reloadAction,
  stopAction,
} from "../actions/tab-actions";
import { generateSearchUrl } from "../lib/generate-search-url";
import { IBrowserTab } from "../stores/tab-models";
import { RootStoreContext } from "../stores/root-store";
import { ArrowLeft, ArrowRight, RotateCw, Home, X } from "react-feather";
import { INTERNAL_START_URL } from "../lib/internal-urls";

interface Props {
  tab: IBrowserTab;
}

const iconSize = 20;
const enabledColor = "#000";
const disabledColor = "#aaa";

const PaneNavigation: React.FC<Props> = ({ tab }) => {
  const { dispatch } = useContext(RootStoreContext);
  const [inputValue, setInputValue] = useState(tab.url || "");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { history, historyIndex, state } = tab;
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);

  const handleGoBack = () => {
    if (canGoBack) {
      dispatch(goBackAction(tab.id));
    }
  };
  const handleGoForward = () => {
    if (canGoForward) {
      dispatch(goForwardAction(tab.id));
    }
  };
  const handleGoHome = () => dispatch(goHomeAction(tab.id));
  const handleStop = () => dispatch(stopAction(tab.id));
  const handleReload = () => dispatch(reloadAction(tab.id));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        dispatch(navigateToUrlAction(tab, generateSearchUrl("google", inputValue.trim())));
        break;
      case "Escape":
        setInputValue(tab.url === INTERNAL_START_URL ? "" : tab.url);
        break;
    }
  };

  useEffect(() => {
    setInputValue(tab.url === INTERNAL_START_URL ? "" : tab.url);
  }, [tab.url]);

  useEffect(() => {
    setCanGoBack(historyIndex > 0);
    setCanGoForward(historyIndex < history.length - 1);
  }, [history, historyIndex, setCanGoBack, setCanGoForward]);

  return (
    <div className="pane-navigation">
      <div className="pane-navigation-icons">
        <ArrowLeft
          size={iconSize}
          color={canGoBack ? enabledColor : disabledColor}
          role="button"
          tabIndex={0}
          aria-disabled={!canGoBack}
          onClick={handleGoBack}
        />
        <ArrowRight
          size={iconSize}
          color={canGoForward ? enabledColor : disabledColor}
          role="button"
          tabIndex={0}
          aria-disabled={!canGoForward}
          onClick={handleGoForward}
        />
        {state === "loaded" ? (
          <RotateCw size={iconSize} role="button" tabIndex={0} onClick={handleReload} />
        ) : (
          <X size={iconSize} role="button" tabIndex={0} onClick={handleStop} />
        )}
        <Home size={iconSize} role="button" tabIndex={0} onClick={handleGoHome} />
      </div>
      <div className="pane-navigation-input">
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
