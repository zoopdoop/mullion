import React from "react";
import { IAppTab } from "../stores/tab-models";
import { Id } from "../stores/generic-types";
import AppTab from "./app-tab";

interface Props {
  appTabs: IAppTab[];
  selectedAppTabId: Id;
}

const AppTabs: React.FC<Props> = ({ appTabs, selectedAppTabId }) => {
  return (
    <div className="app-tabs">
      {appTabs.map((appTab) => (
        <AppTab
          key={appTab.id}
          appTab={appTab}
          visible={appTab.id === selectedAppTabId}
        />
      ))}
    </div>
  );
};

export default AppTabs;
