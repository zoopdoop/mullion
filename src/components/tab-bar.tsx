import React from "react";
import { IBrowserTab } from "../stores/tab-models";
import { Id } from "../stores/generic-types";
import TabBarTab from "./tab-bar-tab";

interface Props {
  tabs: IBrowserTab[];
  selectedTabId?: Id;
  onAddTab: () => void;
  onSelectTab: (tab: IBrowserTab) => void;
  onCloseTab: (tab: IBrowserTab) => void;
}

const TabBar: React.FC<Props> = ({ tabs, selectedTabId, onAddTab, onSelectTab, onCloseTab }) => {
  return (
    <div className="tab-bar">
      {tabs.map(tab => (
        <TabBarTab
          key={tab.id}
          tab={tab}
          selected={tab.id === selectedTabId}
          onSelectTab={onSelectTab}
          onCloseTab={onCloseTab}
        />
      ))}
      <button className="tab-bar-add-button" onClick={onAddTab}>
        +
      </button>
    </div>
  );
};

export default TabBar;
