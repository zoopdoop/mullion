import React from "react";
import generateClassName from "../lib/generate-classname";
import { IBrowserTab } from "../stores/tab-models";

interface Props {
  tab: IBrowserTab;
  selected: boolean;
  onSelectTab: (tab: IBrowserTab) => void;
  onCloseTab: (tab: IBrowserTab) => void;
}

const TabBarTab: React.FC<Props> = ({ tab, selected, onSelectTab, onCloseTab }) => {
  const selectTab = () => onSelectTab(tab);
  const closeTab = (e: React.MouseEvent<HTMLSpanElement>) => {
    onCloseTab(tab);
    e.stopPropagation();
  };
  const handleKeyDownSelectTab = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      selectTab();
    }
  };
  const handleKeyDownCloseTab = (e: React.KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === "Enter") {
      onCloseTab(tab);
      e.stopPropagation();
    }
  };

  const className = generateClassName("tab-bar-tab", { selected });
  return (
    <div className={className} role="button" tabIndex={0} onClick={selectTab} onKeyDown={handleKeyDownSelectTab}>
      {tab.title}
      <span className="close" role="button" tabIndex={0} onClick={closeTab} onKeyDown={handleKeyDownCloseTab}>
        ×
      </span>
    </div>
  );
};

export default TabBarTab;
