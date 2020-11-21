import React from "react";
import generateClassName from "../lib/generate-classname";
import { IAppTab } from "../stores/tab-models";

interface Props {
  appTab: IAppTab;
  selected: boolean;
  selectAppTab: (appTab: IAppTab) => void;
  closeAppTab: (appTab: IAppTab) => void;
}

const AppTabBarTab: React.FC<Props> = ({ appTab, selected, selectAppTab, closeAppTab }) => {
  const selectTab = () => selectAppTab(appTab);
  const closeTab = (e: React.MouseEvent<HTMLSpanElement>) => {
    closeAppTab(appTab);
    e.stopPropagation();
  };
  const handleKeyDownSelectTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      selectTab();
    }
  };
  const handleKeyDownCloseTab = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      closeAppTab(appTab);
      e.stopPropagation();
    }
  };

  const className = generateClassName("app-tab-bar-tab", { selected });
  return (
    <div className={className} role="button" tabIndex={0} onClick={selectTab} onKeyDown={handleKeyDownSelectTab}>
      {appTab.title}
      <span className="close" role="button" tabIndex={0} onClick={closeTab} onKeyDown={handleKeyDownCloseTab}>
        ×
      </span>
    </div>
  );
};

export default AppTabBarTab;
